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
import { Badge } from '@/components/ui/badge';

interface ComboBoxFieldProps {
  fieldName: string;
  label: string;
  options: {
    documentId: string;
    name: string;
  }[];
  form: any;
  acceptMultiple?: boolean;
}

const ComboBoxField = ({
  fieldName,
  label,
  options,
  form,
  acceptMultiple = false,
}: ComboBoxFieldProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSelect = (value: string) => {
    if (acceptMultiple) {
      const current = form.getValues(fieldName) || [];
      if (current.includes(value)) {
        form.setValue(
          fieldName,
          current.filter((v: string) => v !== value),
          {
            shouldDirty: true,
          }
        );
      } else {
        form.setValue(fieldName, [...current, value], { shouldDirty: true });
      }
    } else {
      form.setValue(fieldName, value, { shouldDirty: true });
    }
    setOpen(false);
    setInputValue('');
  };

  const handleRemove = (value: string) => {
    const current = form.getValues(fieldName) || [];
    form.setValue(
      fieldName,
      current.filter((v: string) => v !== value),
      { shouldDirty: true }
    );
    setOpen(true);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const selectedValues = form.watch(fieldName);

  return (
    <div className="space-y-2">
      <Label className="font-medium">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex w-full items-center">
            <FormField
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      ref={inputRef}
                      placeholder={`Select ${label}`}
                      value={
                        acceptMultiple
                          ? inputValue
                          : options.find((b) => b.documentId === field.value)
                              ?.name || ''
                      }
                      readOnly={!acceptMultiple}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                      }}
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
        {acceptMultiple && selectedValues && selectedValues.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {(selectedValues || []).map((id: string) => {
              const option = options.find((b) => b.documentId === id);
              if (!option) return null;
              return (
                <Badge key={id} variant="outline">
                  {option.name}
                  <button
                    type="button"
                    className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(id);
                    }}
                  >
                    ×
                  </button>
                </Badge>
              );
            })}
          </div>
        )}
        <PopoverContent
          className="w-full p-0 min-w-[200px]"
          align="start"
          style={{ width: inputRef.current?.offsetWidth || 'auto' }}
        >
          <Command>
            <CommandInput
              placeholder="Search key..."
              value={inputValue}
              onValueChange={handleInputChange}
            />
            <CommandEmpty>No matching key found.</CommandEmpty>
            <CommandGroup style={{ maxHeight: 150, overflowY: 'auto' }}>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.documentId}
                  value={option.documentId}
                  onSelect={() => {
                    handleSelect(option.documentId);
                    if (!acceptMultiple) {
                      setOpen(false);
                      setInputValue('');
                    }
                  }}
                  onMouseDown={(e) => {
                    if (acceptMultiple) e.preventDefault();
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      acceptMultiple
                        ? (selectedValues || []).includes(option.documentId)
                          ? 'opacity-100'
                          : 'opacity-0'
                        : selectedValues === option.documentId
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

export default ComboBoxField;
