import type { ReactNode } from 'react';

import { CartesianGrid, XAxis, Line, LineChart, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/shared/charts';

import { Handshake } from 'lucide-react';

const transformToChartData = (data: number[]) => {
  return data.map((value, index) => ({
    day: index + 1,
    price: value,
  }));
};

type TProps = {
  balance_history: number[];
};

const chartConfig = {
  price: {
    color: 'var(--chart-3)',
    label: 'Цена',
  },
} satisfies ChartConfig;

const ProfileBalanceHistoryLayout = ({ balance_history }: TProps): ReactNode => {
  const chartData = transformToChartData(balance_history);

  return (
    <ChartContainer
      className='w-full max-h-52'
      config={chartConfig}
    >
      <LineChart
        data={chartData}
        margin={{ bottom: 10, top: 5, right: 5 }}
      >
        <CartesianGrid vertical={false} />

        <YAxis
          dataKey='price'
          tickLine={false}
          axisLine={true}
          tickMargin={20}
          tickFormatter={(value) => `${value}`}
          tick={({ x, y, payload }) => (
            <text
              x={x - 10}
              y={y}
              dy={4}
              textAnchor='end'
              fill='#666'
              fontSize={12}
              transform={`rotate(-45, ${x - 15}, ${y})`}
            >
              {payload.value}
            </text>
          )}
          label={{
            value: 'Койнов',
            position: 'insideLeft',
            offset: 50,
            angle: 90,
            style: { textAnchor: 'middle' },
          }}
        />
        <XAxis
          dataKey='day'
          tickLine={true}
          axisLine={false}
          tickMargin={7}
          domain={[1, 31]}
          ticks={[1, 5, 10, 15, 20, 25, 30, 31]}
          tickFormatter={(value) => `${value}`}
          label={{
            value: 'День месяца',
            position: 'insideBottom',
            offset: -7,
            style: { textAnchor: 'middle' },
          }}
        />
        <ChartTooltip
          cursor={true}
          content={
            <ChartTooltipContent
              formatter={(value) => (
                <div className='flex items-center gap-2'>
                  <p className='text-sm'>{value}</p>
                  <span>
                    <Handshake className='h-5' />
                  </span>
                </div>
              )}
              labelFormatter={(label) => `${label}`}
            />
          }
        />
        <Line
          dataKey='price'
          type='monotone'
          stroke='var(--color-blue-400)'
          strokeWidth={2}
          dot={{
            fill: 'var(--color-blue-400)',
            r: 3,
          }}
          activeDot={{
            r: 6,
            fill: 'var(--color-blue-600)',
          }}
        ></Line>
      </LineChart>
    </ChartContainer>
  );
};

export default ProfileBalanceHistoryLayout;
