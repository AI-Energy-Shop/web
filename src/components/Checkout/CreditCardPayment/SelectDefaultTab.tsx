'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCardIcon, CheckCircle2 } from 'lucide-react';

interface Card {
  id: string;
  brand: string;
  last4Char: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

interface SelectDefaultTabProps {
  cards: Card[];
}

import React from 'react';

function SelectDefaultTab({ cards }: SelectDefaultTabProps) {
  const defaultCardId = cards.find((card) => card.isDefault)?.id || '';
  const [selectedCardId, setSelectedCardId] = useState(defaultCardId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Get brand icon based on card type
  const getBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return <span className="text-blue-600 font-bold italic">VISA</span>;
      case 'mastercard':
        return <span className="text-orange-500 font-bold">Mastercard</span>;
      case 'amex':
        return (
          <span className="text-blue-800 font-bold">American Express</span>
        );
      default:
        return <span className="text-gray-600 font-bold">Card</span>;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="py-4">
        <RadioGroup
          value={selectedCardId}
          onValueChange={setSelectedCardId}
          className="space-y-3"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent transition-colors"
            >
              <RadioGroupItem value={card.id} id={card.id} />
              <Label
                htmlFor={card.id}
                className="flex flex-1 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <CreditCardIcon className="h-5 w-5" />
                  <div>
                    <div className="flex items-center gap-2">
                      {getBrandIcon(card.brand)}
                      <span className="font-mono">•••• {card.last4Char}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Expires {card.expMonth.toString().padStart(2, '0')}/
                      {card.expYear.toString().slice(-2)}
                    </div>
                  </div>
                </div>
                {card.isDefault && (
                  <span className="text-sm text-primary flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Current default
                  </span>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}

export default SelectDefaultTab;
