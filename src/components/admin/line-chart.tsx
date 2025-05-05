'use client';

import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const data = [
  { name: 'Jan', value: 185 },
  { name: 'Feb', value: 250 },
  { name: 'Mar', value: 305 },
  { name: 'Apr', value: 280 },
  { name: 'May', value: 237 },
  { name: 'Jun', value: 73 },
  { name: 'Jul', value: 120 },
  { name: 'Aug', value: 209 },
  { name: 'Sep', value: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function LineChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-full w-full">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Line Chart - Label</h3>
            <p className="text-sm text-gray-500">January - June 2024</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
                labelStyle={{ color: '#374151', fontWeight: 600 }}
                itemStyle={{ color: '#F97316' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#F97316"
                strokeWidth={2}
                dot={{
                  fill: '#F97316',
                  stroke: '#fff',
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{
                  fill: '#F97316',
                  stroke: '#fff',
                  strokeWidth: 2,
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
