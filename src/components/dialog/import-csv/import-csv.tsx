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
import { UploadFile } from '@/hooks/useProductDetails';
import FileUpload from '@/components/dialog/import-csv/file-upload';
import Papa from 'papaparse';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

const ImportCSV = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleInputChange = (e: InputChangeEvent) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Use the first row as keys
        skipEmptyLines: true, // Optional: skips empty lines
        complete: (results) => {
          // Cast results.data to an array of objects
          const data = results.data as Record<string, any>[];
          const filtered = data.filter(
            (row) => row.Title && String(row.Title).trim() !== ''
          );
          // .map((row) => ({
          //   title: row.Title,
          //   price: row.Price,
          //   description: row.Description,
          //   image: row.Image,
          //   category: row.Category,
          // }));
          console.log(filtered);
          // setProducts(filtered);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
      setFile(file);
    }
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
          <Button disabled={products.length === 0} type="submit" size="sm">
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportCSV;
