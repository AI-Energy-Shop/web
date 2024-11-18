'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LOCATIONS, USER_LEVELS } from '@/constant';

interface PriceListItem {
  price: number;
  min_quantity: number;
  max_quantity: number;
  user_level: string;
  location: string;
}

type Prices = {
  price: number;
  min_quantity: number;
  max_quantity: number;
  location: string;
  user_level: string;
};

interface PriceListProps {
  setCurrentProduct: any;
  data?: {
    prices: Prices[];
    documentId: string;
  };
}

const PriceList: React.FC<PriceListProps> = ({ data, setCurrentProduct }) => {
  const [priceList, setPriceList] = useState<any[]>(data?.prices || []);

  const savePriceList = async () => {
    setCurrentProduct((prevState: any) => ({
      ...prevState,
      price_list: { documentId: data?.documentId, prices: [...priceList] },
    }));
  };

  const addPriceListItem = () => {
    const newItem: PriceListItem = {
      price: 0.0,
      min_quantity: 0,
      max_quantity: 0,
      location: LOCATIONS[0],
      user_level: USER_LEVELS[0],
    };
    if (!priceList) {
      setPriceList([newItem]);
    } else {
      setPriceList([...priceList, newItem]);
    }
  };

  const removePriceListItem = (index: number) => {
    setPriceList(priceList.filter((item, indx) => indx !== index));
  };

  const updatePriceListItem = (
    indx: number,
    field: keyof PriceListItem,
    value: string | number
  ) => {
    setPriceList(
      priceList.map((item, index) =>
        indx === index ? { ...item, [field]: value } : item
      )
    );
  };

  const arrayIsEqual = useCallback(
    (a?: PriceListItem[], b?: PriceListItem[]) => {
      return JSON.stringify(a) === JSON.stringify(b);
    },
    []
  );

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">Price List</CardTitle>
          <Button onClick={addPriceListItem} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Price
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {priceList?.map?.((item, index) => (
              <div
                key={index}
                className="grid gap-4 p-4 border rounded-lg relative"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removePriceListItem(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`price-${index}`}>Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">$</span>
                      <Input
                        id={`price-${index}`}
                        type="number"
                        placeholder="0.00"
                        className="pl-7"
                        value={item.price}
                        onChange={(e) =>
                          updatePriceListItem(
                            index,
                            'price',
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`min-quantity-${index}`}>
                      Min Quantity
                    </Label>
                    <Input
                      id={`min-quantity-${index}`}
                      type="number"
                      placeholder="1"
                      value={item.minQuantity}
                      onChange={(e) =>
                        updatePriceListItem(
                          index,
                          'min_quantity',
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`max-quantity-${index}`}>
                      Max Quantity
                    </Label>
                    <Input
                      id={`max-quantity-${index}`}
                      type="number"
                      placeholder="999"
                      value={item.maxQuantity}
                      onChange={(e) =>
                        updatePriceListItem(
                          index,
                          'max_quantity',
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`location-${index}`}>Location</Label>
                    <Select
                      value={item.location}
                      onValueChange={(value) =>
                        updatePriceListItem(index, 'location', value)
                      }
                    >
                      <SelectTrigger id={`location-${index}`}>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATIONS.map((location: string, index: number) => (
                          <SelectItem key={index} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`user-level-${index}`}>User Level</Label>
                    <Select
                      value={item.user_level}
                      onValueChange={(value) =>
                        updatePriceListItem(index, 'user_level', value)
                      }
                    >
                      <SelectTrigger id={`user-level-${index}`}>
                        <SelectValue placeholder="Select user level" />
                      </SelectTrigger>
                      <SelectContent>
                        {USER_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
            {priceList?.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No price lists added. Click the &quot;Add Price&quot; button to
                create one
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {!arrayIsEqual(data?.prices, priceList) && (
            <Button onClick={savePriceList}>Save</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PriceList;
