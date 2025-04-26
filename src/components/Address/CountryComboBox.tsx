'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import CountryList from '@/data/country_combo_box.json';
import { UseFormReturn } from 'react-hook-form';
import { addressSchema } from '@/lib/validation-schema/address-form';
import { z } from 'zod';

type AddressSchemaTypes = z.infer<typeof addressSchema>;

interface CountryComboBoxProps {
  form: UseFormReturn<AddressSchemaTypes, any, undefined>;
}

export default function CountryComboBox({ form }: CountryComboBoxProps) {
  return (
    <FormField
      control={form.control}
      name="country"
      render={({ field }) => (
        <FormItem className="flex flex-col flex-2">
          <FormLabel>Country</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'sm:max-w-44 justify-between overflow-hidden',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? CountryList.find((country) => country.name === field.value)?.name
                    : 'Select Country'}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" onWheel={(e) => e.stopPropagation()}>
              <Command>
                <CommandInput placeholder="Search Country..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No State found.</CommandEmpty>
                  <CommandGroup>
                    {CountryList.map((country) => (
                      <CommandItem
                        value={country.name}
                        key={country.id}
                        onSelect={() => {
                          form.setValue('country', country.name);
                        }}
                      >
                        {country.name}
                        <Check
                          className={cn(
                            'ml-auto',
                            country.name === field.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
