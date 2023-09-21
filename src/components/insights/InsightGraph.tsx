'use client';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div>Loading</div>, // Replace <Loading /> with your custom loading component
});

interface IProps {
  activityValues: number[];
}

const InsightGraph = (props: IProps) => {
  const [labels] = useState<string[]>([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]);
  const [maxValue, setMaxValue] = useState<number>(Number.MIN_SAFE_INTEGER);

  useEffect(() => {
    setMaxValue(Math.max(...props.activityValues));
  }, []);

  console.log(maxValue);

  const chart: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: 'Activity',
        data: props.activityValues,
      },
    ],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        borderRadius: 5,
        colors: {
          ranges: [
            {
              from: 0,
              to: maxValue - 0.2,
              color: '#8915E44D',
            },
            {
              from: maxValue - 0.1,
              to: maxValue,
              color: '#8915E4',
            },
          ],
        },
      },
    },
    annotations: {
      xaxis: [
        {
          x: labels[props.activityValues.indexOf(maxValue)],
          strokeDashArray: 10,
          borderColor: '#000',
          borderWidth: 1,
        },
      ],
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: '#000000',
          fontFamily: 'DM Sans',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
  };

  return (
    <div className="relative border border-2 rounded-lg border-[#8915E460]">
      <div className={'absolute left-[1.75rem] pt-2 font-semibold'}>
        Daily Activity
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Chart
          options={chart}
          series={chart.series}
          type={'bar'}
          width={'200%'}
          height={'175%'}
        />
      </Suspense>
    </div>
  );
};

export default InsightGraph;
