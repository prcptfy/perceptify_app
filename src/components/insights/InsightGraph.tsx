'use client';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div>Loading</div>, // Replace <Loading /> with your custom loading component
});

const InsightGraph = () => {
  const chart: ApexOptions = {
    chart: {
      type: 'bar',
    },
    series: [
      {
        name: 'Activity',
        data: [3, 4, 2, 5, 1, 6, 8],
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Chart
        options={chart}
        series={chart.series}
        type={'bar'}
        width={'250%'}
        height={'100%'}
      />
    </Suspense>
  );
};

export default InsightGraph;
