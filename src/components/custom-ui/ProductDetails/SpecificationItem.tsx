import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Trash2, GripVertical, Check, ChevronsUpDown } from 'lucide-react';
import React, { FC, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface SpecificationItemProps {
  index?: number;
  title?: string;
  item?: {
    key: string;
    value: number | string;
  };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index?: number, title?: any) => void;
  options?: string[];
}

const SpecificationItem: FC<SpecificationItemProps> = ({
  index,
  item,
  title,
  onChange,
  onRemove,
  options = [],
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(item?.key || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (selectedValue: string) => {
    setInputValue(selectedValue);
    setOpen(false);

    // Create a synthetic event
    const event = {
      target: {
        name: 'key',
        value: selectedValue,
        dataset: { index, title },
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onChange?.(event);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    // Create a synthetic event
    const event = {
      target: {
        name: 'key',
        value: value,
        dataset: { index, title },
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onChange?.(event);
  };

  return (
    <div
      className={cn(
        'relative flex items-center gap-6 p-4 rounded-lg border border-border/40',
        'transition-all duration-200 group',
        'hover:border-primary/20 hover:shadow-sm hover:bg-primary/[0.02]'
      )}
    >
      <div className="flex-none text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-5 w-5" />
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-500">Key</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="relative flex w-full">
                <Input
                  ref={inputRef}
                  value={inputValue.replaceAll('_', ' ')}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full h-9 pr-12 cursor-pointer"
                  placeholder="Type or select a key..."
                  readOnly
                />
                <Button
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
                    ?.filter((option) =>
                      option.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .map((option) => (
                      <CommandItem
                        key={option}
                        value={option}
                        onSelect={handleSelect}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            inputValue === option ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {option.replaceAll('_', ' ')}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-500">Value</Label>
          <Input
            type="text"
            data-index={index}
            data-title={title}
            id={`value-${index}`}
            name="value"
            value={item?.value || ''}
            onChange={onChange}
            className="h-9 border-border/40 focus:border-primary/30"
            placeholder="Enter specification value..."
          />
          <p className="text-[10px] text-muted-foreground mt-1 pl-2">
            Value must not contain <span className="font-mono">%</span>,{' '}
            <span className="font-mono">+</span>, or{' '}
            <span className="font-mono">&amp;</span>.
          </p>
          {item?.value && !/^(?!.*[%+&]).+$/.test(item.value.toString()) && (
            <p className="text-xs text-red-500 mt-1">
              Value contains forbidden characters (% + &amp;)
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={() => onRemove(index, title)}
        size="sm"
        variant="ghost"
        className={cn(
          'rounded-full flex-none w-9 h-9 p-0 opacity-0 group-hover:opacity-100',
          'transition-all duration-200',
          'hover:bg-red-50 hover:text-red-500'
        )}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SpecificationItem;
