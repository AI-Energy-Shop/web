'use client';
import { Check } from 'lucide-react';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Command } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronsUpDown } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

interface BrandOptionProps {
  optionsData: {
    documentId: string;
    name: string;
  }[];
  form: any;
}

const BrandOption = ({ optionsData, form }: BrandOptionProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [options, setOptions] = useState(optionsData);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setOptions(
      optionsData.filter((option) =>
        option.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelect = (value: string) => {
    form.setValue('brand', value, {
      shouldDirty: true,
    });
  };

  return (
    <div className="space-y-2">
      <Label className="font-medium">Brand</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex w-full">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Select Brand"
                      value={
                        optionsData.find((b) => b.documentId === field.value)
                          ?.name || ''
                      }
                      readOnly
                      onClick={() => setOpen(true)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              tabIndex={-1}
              className="absolute right-0 top-1/2 -translate-y-1/2 h-9 px-2"
              style={{ pointerEvents: 'none' }}
            >
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0 min-w-[200px]"
          align="start"
          style={{ width: inputRef.current?.offsetWidth }}
        >
          <Command>
            <CommandInput
              placeholder="Search key..."
              value={inputValue}
              onValueChange={handleInputChange}
            />
            <CommandEmpty>No matching key found.</CommandEmpty>
            <CommandGroup style={{ maxHeight: 150, overflowY: 'auto' }}>
              {options
                .filter((option) =>
                  option.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((option) => (
                  <CommandItem
                    key={option.documentId}
                    value={option.documentId}
                    onSelect={() => {
                      handleSelect(option.documentId);
                      setOpen(false);
                      setInputValue('');
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        form.watch('brand') === option.documentId
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {option.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BrandOption;
