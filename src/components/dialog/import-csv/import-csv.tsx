'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import FileUpload from '@/components/dialog/import-csv/file-upload';
import Papa from 'papaparse';
import { createProducts } from '@/app/actions/products';
import { Loader2 } from 'lucide-react';
import { Toast } from '@/lib/toast';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

const ImportCSV = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleInputChange = (e: InputChangeEvent) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Use the first row as keys
        skipEmptyLines: true, // Optional: skips empty lines
        complete: async (results) => {
          // Cast results.data to an array of objects
          const data = results.data as Record<string, any>[];

          const filtered = data
            .filter((row) => row.Title && String(row.Title).trim() !== '')
            .map((item: any) => {
              const specifications = [];
              for (let i = 1; i <= 13; i++) {
                const key = item[`Spec${i} Key`];
                const value = item[`Spec${i} Value`];
                if (key && value && key.trim() !== '' && value.trim() !== '') {
                  specifications.push({
                    key: key.trim(),
                    value: value.trim(),
                  });
                }
              }

              return {
                data: {
                  name: item.Title,
                  model: item['Model'],
                  odoo_product_id: item['Odoo ID'],
                  description: item['HTML Description'],
                  product_type: item['Product Type'],
                  // brand: item['Brand'],
                  maxQuantity:
                    Number(item['Max QTY for Shipping Autocalc']) || null,
                  shipping: {
                    weight: Number(item['Ship Weight (kg)']) || 0,
                    length: Number(item['Ship Length (cm)']) || 0,
                    width: Number(item['Ship Width (cm)']) || 0,
                    height: Number(item['Ship Height (cm)']) || 0,
                  },
                  specifications,
                },
              };
            });
          console.log(filtered);
          setProducts(filtered);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
      setFile(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await bulkProducsCreate(products);
  };

  const bulkProducsCreate = async (products: any[]) => {
    const res = await createProducts(JSON.stringify(products));
    console.log(res);
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import CSV</DialogTitle>
          <DialogDescription>Import producs by csv file</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {file ? (
            <div className="flex flex-col gap-4">{file.name}</div>
          ) : (
            <FileUpload
              maxFiles={1}
              accept="text/csv"
              displayUseExistingFile={false}
              onInputChange={handleInputChange}
            />
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" size="sm" variant="destructive">
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            type="submit"
            onClick={handleSubmit}
            disabled={products.length === 0}
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportCSV;
