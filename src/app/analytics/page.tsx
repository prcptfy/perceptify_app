'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
  Tabs,
  Tab,
  Progress,
  Spinner,
  Switch,
  Skeleton,
} from '@nextui-org/react';
import Chart from 'react-apexcharts';
import InstagramIcon from '@/components/icons/InstagramIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import TikTokIcon from '@/components/icons/TikTokIcon';
import TwitterIcon from '@/components/icons/TwitterIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';
import LinkedinIcon from '@/components/icons/LinkedInIcon';
import { useSupabase } from '@/components/supabase-provider';

type timeRange = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '3Y' | 'YTD' | 'ALL';

// add future socials when we  add them
type social = 'TikTok' | 'X' | 'Instagram' | 'Facebook' | 'Google' | 'LinkedIn';
type socialsMap = Record<social, Socials>;

interface Socials {
  enabled: boolean;
  toggled: boolean;
  percentChange: string;
  relativeStrength: number;
  chartData: { [key: number]: number[] };
}

type dataByTimeRange = Partial<Record<timeRange, any>>;

const icons = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  TikTok: TikTokIcon,
  X: TwitterIcon,
  Google: GoogleIcon,
  LinkedIn: LinkedinIcon,
};

const socialColors: Record<social, string> = {
  Instagram: '#E1306C',
  Facebook: '#2986cc',
  TikTok: '#000000',
  X: '#000000',
  Google: '#FFE047',
  LinkedIn: '#2867B2',
};

const progressSocialColors: Record<social, string> = {
  Instagram: '!bg-[#E1306C]',
  Facebook: '!bg-[#2986cc]',
  TikTok: '!bg-black',
  X: '!bg-black',
  Google: '!bg-[#FFE047]',
  LinkedIn: '!bg-[#2867B2]',
};

const socials: socialsMap = {
  TikTok: {
    enabled: false,
    toggled: true,
    chartData: {},
    relativeStrength: 0,
    percentChange: '+0%',
  },
  X: {
    enabled: false,
    toggled: true,
    chartData: {},
    relativeStrength: 0,
    percentChange: '+0%',
  },
  Instagram: {
    enabled: false,
    toggled: true,
    chartData: {},
    relativeStrength: 0,
    percentChange: '+0%',
  },
  Facebook: {
    enabled: false,
    toggled: true,
    chartData: {},
    relativeStrength: 0,
    percentChange: '+0%',
  },
  Google: {
    enabled: false,
    toggled: true,
    chartData: {},
    relativeStrength: 0,
    percentChange: '+0%',
  },
  LinkedIn: {
    enabled: false,
    toggled: true,
    chartData: {},
    relativeStrength: 0,
    percentChange: '+0%',
  },
};

const charts = ['relevance_score', 'sentiment_score'];

const Analytics = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  const [chartData, setChartData] = useState<dataByTimeRange[]>([]);

  const { supabase } = useSupabase();

  const pairwise = (arr: any[], func: (current: any, next: any) => any) => {
    for (let i = 0; i < arr.length - 1; i++) func(arr[i], arr[i + 1]);
  };

  const calculateRelativeStrength = (scores: number[]) => {
    const ups: number[] = [],
      downs: number[] = [];

    pairwise(scores, (current, next) => {
      const diff = next - current;

      if (diff >= 0) ups.push(diff);
      else downs.push(Math.abs(diff));
    });

    const avgUp = ups.reduce((a, c) => a + c, 0) / ups.length;
    const avgDown = downs.reduce((a, c) => a + c, 0) / downs.length;

    return Math.floor(100 - 100 / (1 + avgUp / avgDown));
  };

  const getDayName = (date: Date) => {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return daysOfWeek[date.getDay()];
  };

  const generateDaysOfWeek = () => {
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(today.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
      return getDayName(day);
    });
    days[6] = 'Today';
    return days;
  };

  const generateWeeksOfMonth = () => {
    return Array.from({ length: 7 }, (_, i) => {
      if (i === 6) {
        return 'This Week';
      }
      return `Week ${i + 1}`;
    });
  };

  useEffect(() => {
    if (!firstRender) return;
    setFirstRender(true);

    const fetchData = async () => {
      try {
        const data = await supabase
          .from('data_duplicate')
          .select()
          .filter('company_id', 'in', `(${1 /* GET COMPANY ID */})`)
          .filter('timestamp', 'lte', Date.now());
        if (!data['data']) throw new Error('No company data');

        const ranges: dataByTimeRange = {
          '1D': {
            start: new Date().setHours(0, 0, 0, 0),
            end: new Date().setHours(24, 0, 0, 0),
            label: 'Last 24 hours',
            categories: [
              '00:00',
              '04:00',
              '08:00',
              '12:00',
              '16:00',
              '20:00',
              '24:00',
            ],
            relativeStrengths: {},
            socials: structuredClone(socials),
          },
          '1W': {
            start: Date.now() - 6.048e8,
            end: Date.now(),
            label: 'Past week',
            categories: generateDaysOfWeek(),
            relativeStrengths: {},
            socials: structuredClone(socials),
          },
          '1M': {
            start: Date.now() - 2.628e9,
            end: Date.now(),
            label: 'Past month',
            categories: generateWeeksOfMonth(),
            relativeStrengths: {},
            socials: structuredClone(socials),
          },
          '3M': {
            start: Date.now() - 7.884e9,
            end: Date.now(),
            label: 'Past 3 months',
            categories: [
              'Week 1',
              'Week 3',
              'Week 5',
              'Week 7',
              'Week 9',
              'Week 11',
              'Week 13',
            ],
            relativeStrengths: {},
            socials: structuredClone(socials),
          },
          '6M': {
            start: Date.now() - 1.577e10,
            end: Date.now(),
            label: 'Past 6 months',
            categories: [
              'Month 1',
              'Month 2',
              'Month 3',
              'Month 4',
              'Month 5',
              'Month 6',
              'Month 7',
            ],
            relativeStrengths: {},
            socials: structuredClone(socials),
          },
          '1Y': {
            start: Date.now() - 3.154e10,
            end: Date.now(),
            label: 'Past year',
            categories: [
              'Month 1',
              'Month 2',
              'Month 3',
              'Month 4',
              'Month 5',
              'Month 6',
              'Month 7',
              'Month 8',
              'Month 9',
              'Month 10',
              'Month 11',
              'Month 12',
            ],
            relativeStrengths: {},
            socials: structuredClone(socials),
          },
          '3Y': {
            start: Date.now() - 9.461e10,
            end: Date.now(),
            label: 'Past 3 years',
            categories: [
              'Month 1',
              'Month 2',
              'Month 3',
              'Month 4',
              'Month 5',
              'Month 6',
              'Month 7',
              'Month 8',
              'Month 9',
              'Month 10',
              'Month 11',
              'Month 12',
              'Month 13',
              'Month 14',
              'Month 15',
              'Month 16',
              'Month 17',
              'Month 18',
              'Month 19',
              'Month 20',
              'Month 21',
              'Month 22',
              'Month 23',
              'Month 24',
              'Month 25',
              'Month 26',
              'Month 27',
              'Month 28',
              'Month 29',
              'Month 30',
              'Month 31',
              'Month 32',
              'Month 33',
              'Month 34',
              'Month 35',
              'Month 36',
            ],
            relativeStrengths: {},
            socials: structuredClone(socials),
          },
          YTD: {
            start: new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0),
            end: new Date(),
            label: 'Year to date',
            categories: [],
            relativeStrengths: {},
            socials: structuredClone(socials),
          },
          ALL: {
            start: 0,
            end: Date.now(),
            label: 'All Time',
            categories: [],
            relativeStrengths: {},
            socials: structuredClone(socials),
          },
        };

        data.data.forEach((d) => {
          const social = Object.keys(socials)[d['media_id']];
          if (!social) return;

          const date = new Date(d.timestamp).valueOf();

          const validRanges = Object.keys(ranges).filter(
            (r) =>
              date > (ranges[r as keyof typeof ranges]?.start ?? 0) &&
              date <= Date.now()
          );

          validRanges.forEach((r) => {
            const range = ranges[r as keyof typeof ranges];

            const periodSize =
              (range.end - range.start) / (range.categories.length || 8.64e7);
            const period = Math.floor((date - range.start) / periodSize);

            const chart = range.socials[social].chartData;

            range.socials[social].enabled = true;
            const da = charts.reduce(
              (a, c) => ({ ...a, [c]: parseInt(d[c]) }),
              {}
            );

            if (period in chart) chart[period].push(da);
            else chart[period] = [da];
          });
        });

        const padArray = (arr: any[], length: number, fill: string | number) =>
          length > arr.length
            ? arr.concat(Array(length - arr.length).fill(fill))
            : arr;

        charts.forEach((chart) => {
          const cd: dataByTimeRange = structuredClone(ranges);

          Object.keys(cd).forEach((r) => {
            const range = cd[r as timeRange];
            const socials = range.socials;

            Object.keys(socials)
              .filter((s) => socials[s].enabled)
              .forEach((s) => {
                const newChartData = padArray(
                  Object.keys(socials[s].chartData).map((key) =>
                    (
                      socials[s].chartData[key].reduce(
                        (a: number, c: Record<string, number>) => a + c[chart],
                        0
                      ) / socials[s].chartData[key].length
                    ).toFixed(0)
                  ),
                  range.categories.length,
                  0
                );

                const first = newChartData[0];
                const last = newChartData.at(-1);
                const diff = last - first;

                const percent = (diff / first) * 100;

                const newSocials = {
                  ...socials[s],
                  chartData: newChartData,
                  percentChange: `${percent > 0 ? '+' : ''}${percent.toFixed(
                    0
                  )}%`,
                  relativeStrength: calculateRelativeStrength(newChartData),
                };

                cd[r as timeRange].socials[s] = newSocials;
              });
          });

          setChartData((p) => [...p, cd]);
        });

        // setCurrentSocials(ranges['1D'].socials || {});
        // setDataByTimeRange(ranges);
        setLoading(false);
      } catch (err) {
        console.error('Could not fetch data: ' + err);
        setError(err as string);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <AnalyticsChartSection data={chartData[0]} title="Relative Strength" />
      <AnalyticsChartSection data={chartData[1]} title="Sentimental Score" />
    </>
  );
};

interface AnalyticsChartSectionProps {
  data: dataByTimeRange;
  title: string;
}

const AnalyticsChartSection = ({ data, title }: AnalyticsChartSectionProps) => {
  const [timeRange, setTimeRange] = useState<timeRange>('1D');
  const [currentSocials, setCurrentSocials] = useState<socialsMap>(
    {} as socialsMap
  );
  const [aggregateToggle, setAggregateToggle] = useState<boolean>(true);

  const handleTimeRangeChange = (key: React.Key) => {
    const k = key as timeRange;

    setTimeRange(k);
    setCurrentSocials(data[k]?.socials || {});
  };

  const handleSocialChange = (key: social) => {
    const social = currentSocials[key];
    setCurrentSocials({
      ...currentSocials,
      [key]: {
        ...social,
        toggled: !social.toggled,
      },
    });
  };

  const activeSocialKeys = (Object.keys(currentSocials) as social[]).filter(
    (key: social) => currentSocials[key].enabled && currentSocials[key].toggled
  );

  const activeSocialColors = activeSocialKeys.map(
    (key: social) => socialColors[key]
  );

  const getSeries = (key: string) => {
    return {
      name: key,
      data: data[timeRange]?.socials[key].chartData || [],
    };
  };

  interface chartItem {
    name: string;
    data: number[];
  }

  const calculateAggregate = (): chartItem => {
    const ret: chartItem = {
      name: 'Aggregate',
      data: [],
    };

    if (Object.keys(currentSocials).length === 0) return ret;

    const socials = (Object.keys(currentSocials) as social[]).filter(
      (key: social) => currentSocials[key].enabled
    );

    if (socials.length === 0) return ret;

    // @ts-expect-error
    for (let i = 0; i < currentSocials[socials[0]].chartData.length || 0; i++) {
      const sum: number = socials.reduce((a: number, c: social) => {
        const social = currentSocials[c];

        // @ts-expect-error
        return a + parseInt(social.chartData[i]);
      }, 0);

      ret.data.push(Math.round(sum / socials.length));
    }

    return ret;
  };

  const chartOptions: ApexCharts.ApexOptions = {
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0,
        opacityTo: 0,
      },
    },
    tooltip: {
      x: {
        show: false,
      },
    },
    dataLabels: { enabled: false },
    chart: {
      id: 'area',
    },
    xaxis: {
      crosshairs: { show: false, fill: { type: 'none' } },
      tooltip: { enabled: false },
      axisTicks: { show: false },
      categories:
        (data &&
          Object.keys(data).length > 0 &&
          data[timeRange as timeRange]?.categories) ||
        [],
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
    },
    grid: {
      yaxis: {
        lines: { show: false },
      },
    },
    noData: {
      text: 'There is no data for this period.',
    },
    colors: [...activeSocialColors, '#8915E4'],
    stroke: {
      colors: [...activeSocialColors, '#8915E4'], // colors of the lines in the chart,
      dashArray: activeSocialColors.map(() => 0).concat(10),
      lineCap: 'round',
      width: 4,
    },
  };

  return (
    <div className="p-10">
      <h1 className="mb-8 text-4xl">{title}</h1>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 h-max min-h-[50vh]">
          {(data && (
            <Suspense
              fallback={<Skeleton className="h-auto w-auto rounded-lg" />}
            >
              <Switch
                color="secondary"
                isSelected={aggregateToggle}
                onValueChange={setAggregateToggle}
              >
                Aggregate Line
              </Switch>
              <Chart
                options={chartOptions}
                series={(Object.keys(currentSocials) as social[])
                  .filter(
                    (key: social) =>
                      currentSocials[key].enabled && currentSocials[key].toggled
                  )
                  .map((key) => getSeries(key))
                  .concat(aggregateToggle ? calculateAggregate() : [])}
                type="area"
                height="100%"
                width="100%"
              />

              <Tabs
                variant="bordered"
                selectedKey={timeRange || '1D'}
                onSelectionChange={handleTimeRangeChange}
                style={{ marginTop: '24px' }}
                classNames={{
                  tabList:
                    'w-full relative overflow-x-auto shadow-none !border-none !bg-gray-50',
                  cursor: 'cursor-auto',
                  tab: 'rounded-md text-black',
                }}
                color="secondary"
                radius="full"
              >
                {Object.keys(data).map((key) => (
                  <Tab key={key} title={key}></Tab>
                ))}
              </Tabs>
            </Suspense>
          )) || <Spinner className="left-1/2" color="secondary" />}
        </div>
        <div className="col-span-4 h-full rounded-lg bg-gray-50 p-6 font-medium">
          <h2 className="mb-2 text-lg">Relative Strength</h2>
          <h3 className="mb-4 text-sm text-gray-500">
            Platform relevance compared to historical performance.
          </h3>
          {(timeRange !== 'ALL' &&
            (Object.keys(currentSocials) as social[])
              .filter((key: social) => currentSocials[key].enabled)
              .map((social) => (
                <div className="my-4" key={social}>
                  <Progress
                    label={social}
                    value={currentSocials[social as social].relativeStrength}
                    showValueLabel={true}
                    classNames={{
                      indicator: progressSocialColors[social],
                    }}
                  />
                </div>
              ))) || <h4>N/A</h4>}
        </div>

        <div className="col-span-12 mt-8 flex flex-nowrap gap-6 overflow-auto overflow-x-auto p-1">
          {(Object.keys(currentSocials) as social[])
            .filter((key: social) => currentSocials[key].enabled)
            .map((key) => (
              <div
                onClick={() => handleSocialChange(key)}
                className="icon flex flex-initial shrink-0 cursor-pointer flex-col items-center justify-center"
                key={key}
              >
                {React.createElement(icons[key], {
                  sideLength: 100,
                  grey: !currentSocials[key].toggled,
                })}
                <h3 className="text-md text-italic text-center">{key}</h3>
                <h6
                  className={
                    parseInt(currentSocials[key].percentChange) >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {currentSocials[key].percentChange}
                </h6>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
