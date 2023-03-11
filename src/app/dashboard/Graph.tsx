'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const labels = Array.from(Array(20).keys());

export const data: ChartData<'line'> = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 25, max: 100 })),
      backgroundColor: '#ed2d2d8f',
      borderColor: '#ed2d2d8f',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 25, max: 100 })),
      backgroundColor: '#0398fc8f',
      borderColor: '#0398fc8f',
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => faker.datatype.number({ min: 25, max: 100 })),
      backgroundColor: '#fcba038f',
      borderColor: '#fcba038f',
    },
  ],
};

export default function Graph() {
  return <Line height={400} width={500} options={options} data={data} />;
}
