import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  percentageChange: number;
}

export function StatsCard({ title, value, percentageChange }: StatsCardProps) {
  const isPositive = percentageChange >= 0;
  const Icon = isPositive ? ArrowUpIcon : ArrowDownIcon;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">{value}</span>
            <span
              className={`flex items-center gap-0.5 text-sm ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <Icon className="h-3 w-3" />
              {Math.abs(percentageChange)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
