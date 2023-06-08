'use client';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div>Loading</div>, // Replace <Loading /> with your custom loading component
});

interface IProps {
  activityValues: number[];
}

const InsightGraph = (props: IProps) => {
  //logic to determine biggest # and fill colors to

  const [maxValue] = useState(Math.max(...props.activityValues));
  const [maxIndex] = useState(
    props.activityValues.indexOf(Math.max(...props.activityValues))
  );

  console.log(maxIndex);

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
        // distributed: true,
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
    legend: {
      show: false,
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: '#000000',
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
    <div>
      <div>Daily Activity</div>
      <Suspense fallback={<div>Loading...</div>}>
        <Chart
          options={chart}
          series={chart.series}
          type={'bar'}
          width={'250%'}
          height={'100%'}
        />
      </Suspense>
    </div>
  );
};

export default InsightGraph;
