'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Tabs, Tab, Progress, Spinner, toggle } from '@nextui-org/react';
import Chart from 'react-apexcharts';
import InstagramIcon from '@/components/icons/InstagramIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import TikTokIcon from '@/components/icons/TikTokIcon';
import TwitterIcon from '@/components/icons/TwitterIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';
import LinkedinIcon from '@/components/icons/LinkedInIcon';
import { useSupabase } from '@/components/supabase-provider';

type timeRange = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '3Y' | 'ALL';

// add futrue socials when we  add them
type social =
  | 'TikTok'
  | 'Twitter'
  | 'Instagram'
  | 'Facebook'
  | 'Google'
  | 'LinkedIn';
type socialsMap = Record<social, Socials>;
interface Socials {
  enabled: boolean;
  toggled: boolean;
  percentChange: string;
  chartData: { [key: number]: number[] };
}

type dataByTimeRange = Partial<Record<timeRange, any>>;

const Analytics = () => {
  const icons = {
    Instagram: InstagramIcon,
    Facebook: FacebookIcon,
    TikTok: TikTokIcon,
    Twitter: TwitterIcon,
    Google: GoogleIcon,
    LinkedIn: LinkedinIcon,
  };
  const socialColors: Record<social, string> = {
    Instagram: '#E1306C',
    Facebook: '#2986cc',
    TikTok: '#000000',
    Twitter: '#1DA1F2',
    Google: '#FFE047',
    LinkedIn: '#2867B2',
  };
  const socials: socialsMap = {
    TikTok: {
      enabled: false,
      toggled: true,
      chartData: {},
      percentChange: '+0%',
    },
    Twitter: {
      enabled: false,
      toggled: true,
      chartData: {},
      percentChange: '+0%',
    },
    Instagram: {
      enabled: false,
      toggled: true,
      chartData: {},
      percentChange: '+0%',
    },
    Facebook: {
      enabled: false,
      toggled: true,
      chartData: {},
      percentChange: '+0%',
    },
    Google: {
      enabled: false,
      toggled: true,
      chartData: {},
      percentChange: '+0%',
    },
    LinkedIn: {
      enabled: false,
      toggled: true,
      chartData: {},
      percentChange: '+0%',
    },
  };

  const [timeRange, setTimeRange] = useState<timeRange>('1D');
  const [dataByTimeRange, setDataByTimeRange] = useState<dataByTimeRange>(
    {} as dataByTimeRange
  );
  const [currentSocials, setCurrentSocials] = useState<socialsMap>(
    {} as socialsMap
  );

  const handleTimeRangeChange = (key: React.Key) => {
    const k = key as timeRange;

    setTimeRange(k);
    setCurrentSocials(dataByTimeRange[k]?.socials || {});
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

  const chartOptions: ApexCharts.ApexOptions = {
    tooltip: {
      x: {
        show: false,
      },
      shared: false,
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const point = series[seriesIndex];
        const start = series[seriesIndex][0];

        const percent = ((point - start) / start) * 100;

        return `<div class="p-2 rounded-lg shadow-lg bg-white">
          <h6 class="text-xs">${series[seriesIndex][dataPointIndex]}</h6>
        </div>`;
      },
    },
    dataLabels: { enabled: false },
    chart: { id: 'area' },
    xaxis: {
      crosshairs: { show: false, fill: { type: 'none' } },
      axisTicks: { show: false },
      categories:
        dataByTimeRange[timeRange as keyof typeof dataByTimeRange]
          ?.categories || [],
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
    },
    colors: activeSocialColors, // colors of the lines in the chart
  };

  const currentRelativeStrength =
    dataByTimeRange[timeRange]?.relativeStrength || {};

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await supabase
          .from('data')
          .select()
          .filter('company_id', 'in', `(${1 /* GET COMPANY ID */})`);
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
            categories: ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'],
            relativeStrengths: {},
            socials: structuredClone(socials),
          },
          '1M': {
            start: Date.now() - 2.628e9,
            end: Date.now(),
            label: 'Past month',
            categories: [
              'Week 1',
              'Week 1.5',
              'Week 2',
              'Week 2.5',
              'Week 3',
              'Week 3.5',
              'Week 4',
            ],
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
          } /* ,
                    'YTD': {
                        start: new Date(new Date().setMonth(0, 1)).setHours(0, 0, 0, 0),
                        end: Date.now(),
                        label: "Year to date",
                        categories: [],
                        relativeStrengths: {},
                        socials: structuredClone(socials)
                    },
                    'ALL': {
                        start: 0,
                        end: Date.now(),
                        label: "All Time",
                        categories: [],
                        relativeStrengths: {},
                        socials: structuredClone(socials)
                    }*/,
        };

        data.data.forEach((d) => {
          const social = Object.keys(socials)[d['media_id']];

          const t = d.timestamp.split(' ');
          const date = new Date(t[0]).setDate(t[1]);

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
            // TODO: Do relative strength calculations
            if (period in chart)
              chart[period].push(parseInt(d['mention_count']));
            else chart[period] = [parseInt(d['mention_count'])];
          });
        });

        const padArray = (arr: any[], length: number, fill: string | number) =>
          length > arr.length
            ? arr.concat(Array(length - arr.length).fill(fill))
            : arr;

        console.log(ranges);
        Object.keys(ranges).forEach((r) => {
          const range = ranges[r as keyof typeof ranges];
          const socials = range.socials;

          Object.keys(socials)
            .filter((s) => socials[s].enabled)
            .forEach((s) => {
              const newChartData = padArray(
                Object.keys(socials[s].chartData).map((key) =>
                  (
                    socials[s].chartData[key].reduce(
                      (a: number, c: number) => a + c,
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

              socials[s] = {
                ...socials[s],
                chartData: newChartData,
                percentChange: `${percent > 0 ? '+' : ''}${percent.toFixed(
                  0
                )}%`,
              };
            });
        });
        console.log(ranges);

        setCurrentSocials(ranges['1D'].socials || {});
        setDataByTimeRange(ranges);
        setLoading(false);
      } catch (err) {
        console.error('Could not fetch data: ' + err);
        setError(err as string);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const getSeries = (key: string) => {
    return {
      name: key,
      data: dataByTimeRange[timeRange]?.socials[key].chartData || [],
    };
  };

  return (
    <div className=" p-10">
      <h1 className="mb-8 text-4xl">Relevance</h1>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 h-max min-h-[50vh]">
          <Suspense fallback={<Spinner />}>
            <Chart
              options={chartOptions}
              series={(Object.keys(currentSocials) as social[])
                .filter(
                  (key: social) =>
                    currentSocials[key].enabled && currentSocials[key].toggled
                )
                .map((key) => getSeries(key))}
              type="area"
              height="100%"
              width="100%"
            />

            <Tabs
              variant="bordered"
              selectedKey={timeRange || '1D'}
              onSelectionChange={handleTimeRangeChange}
              classNames={{
                tabList: 'w-full relative overflow-x-auto shadow-none',
                cursor: 'cursor-auto',
                tab: 'rounded-md text-black',
              }}
              color="secondary"
            >
              {Object.keys(dataByTimeRange).map((key) => (
                <Tab key={key} title={key}></Tab>
              ))}
            </Tabs>
          </Suspense>
        </div>
        <div className="col-span-4 h-full rounded-lg p-6 shadow-lg">
          <h2 className="mb-4">Relative Strength</h2>
          {(timeRange !== 'ALL' &&
            Object.keys(currentRelativeStrength).map((social) => (
              <div className="my-4 text-sm" key={social}>
                <Progress
                  label={social.toUpperCase()}
                  value={currentRelativeStrength[social]}
                  showValueLabel={true}
                />
              </div>
            ))) || <h4 className="text-sm">N/A</h4>}
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
                  sideLength: 75,
                  grey: !currentSocials[key].toggled,
                })}
                <h3 className="text-md text-italic text-center">{key}</h3>
                <h6
                  className={
                    parseInt(currentSocials[key].percentChange) > 0
                      ? 'text-green-400'
                      : 'text-red-400'
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
