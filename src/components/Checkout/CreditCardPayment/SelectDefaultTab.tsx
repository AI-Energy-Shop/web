'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCardIcon, CheckCircle2 } from 'lucide-react';
import React from 'react';
import { GetCheckoutUserDataQuery } from '@/lib/gql/graphql';
import { Form, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateCreditCardDefault } from '@/app/actions/credit-card';

const FormSchema = z.object({
  cardId: z.string(),
});

interface SelectDefaultTabProps {
  checkoutUserData: GetCheckoutUserDataQuery;
}

function SelectDefaultTab({ checkoutUserData }: SelectDefaultTabProps) {
  const cards = checkoutUserData?.usersPermissionsUser?.creditCards;

  const defaultCardId = cards?.find((card) => card?.isDefault)?.documentId;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cardId: defaultCardId || '',
    },
  });

  function cardsNeedToMakeItDefault(documentId: string) {
    return cards?.filter(
      (card) => card?.documentId !== documentId && card?.isDefault
    );
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const cardNeedToUpdateToFalse = cardsNeedToMakeItDefault(data.cardId);

      cardNeedToUpdateToFalse?.forEach((card) => {
        updateCreditCardDefault(card?.documentId!, false);
      });

      updateCreditCardDefault(data.cardId, true);
    } catch (error) {
      console.log(error);
    }
  }

  function getBrandIcon(brand: string) {
    switch (brand.toLowerCase()) {
      case 'visa':
        return (
          <span className="text-blue-600 font-bold italic">
            {brand.toUpperCase()}
          </span>
        );
      case 'mastercard':
        return (
          <span className="text-orange-500 font-bold">
            {brand.toUpperCase()}
          </span>
        );
      case 'amex':
        return (
          <span className="text-blue-800 font-bold">{brand.toUpperCase()}</span>
        );
      default:
        return (
          <span className="text-gray-600 font-bold">{brand.toUpperCase()}</span>
        );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-4">
          <FormField
            control={form.control}
            name="cardId"
            render={({ field }) => (
              <RadioGroup
                className="space-y-3"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {cards?.map((card) => (
                  <div
                    key={card?.documentId}
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent transition-colors"
                  >
                    <RadioGroupItem
                      value={card?.documentId!}
                      id={card?.documentId}
                    />
                    <Label
                      htmlFor={card?.documentId}
                      className="flex flex-1 items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <CreditCardIcon className="h-5 w-5" />
                        <div>
                          <div className="flex items-center gap-2">
                            {getBrandIcon(card?.brand as string)}
                            <span className="font-mono">
                              •••• {card?.last4Char}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Expires{' '}
                            {card?.expMonth?.toString().padStart(2, '0')}/
                            {card?.expYear?.toString().slice(-2)}
                          </div>
                        </div>
                      </div>
                      {card?.isDefault && (
                        <span className="text-sm text-primary flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Current default
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}

export default SelectDefaultTab;
