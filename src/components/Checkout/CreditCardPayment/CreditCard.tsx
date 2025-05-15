import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CreditCardIcon, CheckCircle2 } from 'lucide-react';

interface CreditCardProps {
  brand: string;
  last4Char: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

export function CreditCard({
  brand,
  last4Char,
  expMonth,
  expYear,
  isDefault,
}: CreditCardProps) {
  // Format expiration month to always be 2 digits
  const formattedExpMonth = expMonth.toString().padStart(2, '0');

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-200 hover:shadow-md',
        isDefault && 'ring-2 ring-primary'
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="h-10 flex items-center">
            <CreditCardIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-1 text-blue-800 font-bold text-lg">
              {brand.toUpperCase()}
            </span>
          </div>
          {isDefault && (
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary flex items-center gap-1"
            >
              <CheckCircle2 className="h-3 w-3" />
              Default
            </Badge>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Card Number</p>
            <p className="font-mono text-xl">•••• •••• •••• {last4Char}</p>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-muted-foreground">Expiration Date</p>
              <p className="font-medium">
                {formattedExpMonth}/{expYear.toString().slice(-2)}
              </p>
            </div>

            <div className="w-12 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded opacity-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
