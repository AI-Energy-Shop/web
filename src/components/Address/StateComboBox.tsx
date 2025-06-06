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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import StateList from '@/data/state_combo_box.json';
import { UseFormReturn } from 'react-hook-form';
import { addressSchema } from '@/lib/validation-schema/address-form';
import { z } from 'zod';
import CountryList from '@/data/country_combo_box.json';

type AddressSchemaTypes = z.infer<typeof addressSchema>;

interface StateComboBoxProps {
  form: UseFormReturn<AddressSchemaTypes, any, AddressSchemaTypes>;
  country: string;
}

export default function StateComboBox({
  form,
  country: countryState,
}: StateComboBoxProps) {
  const countryCode = CountryList.find(
    (country) => country.name.toLowerCase() === countryState.toLocaleLowerCase()
  )?.acronym;

  const filteredState = StateList.filter((state) =>
    state.display_name.includes(countryCode || '')
  );

  return (
    <FormField
      control={form.control}
      name="state"
      render={({ field }) => (
        <FormItem className="flex flex-col flex-2">
          <FormLabel>State</FormLabel>
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
                    ? filteredState.find(
                        (state) => state.display_name === field.value
                      )?.display_name
                    : 'Select State'}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="p-0"
              onWheel={(e) => e.stopPropagation()}
            >
              <Command>
                <CommandInput placeholder="Search State..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No State found.</CommandEmpty>
                  <CommandGroup>
                    {filteredState.map((state) => (
                      <CommandItem
                        value={state.display_name}
                        key={state.id}
                        onSelect={() => {
                          form.setValue('state', state.display_name);
                        }}
                      >
                        {state.display_name}
                        <Check
                          className={cn(
                            'ml-auto',
                            state.display_name === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
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
