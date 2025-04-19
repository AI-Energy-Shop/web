'use client';
import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlus, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { userProfileSchema } from '@/lib/validation-schema/user-profile-form';
import { FormField } from '../ui/form';
interface ImageUploadInputProps {
  onChange: (url: string) => void;
  onRemove: () => void;
  value?: string;
  disabled?: boolean;
  className?: string;
  form: UseFormReturn<z.infer<typeof userProfileSchema>>;
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({ className, form }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      // Basic validation
      if (!file.type.includes('image')) {
        throw new Error('Please upload an image file');
      }

      // Size validation (e.g., 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image must be less than 5MB');
      }

      setIsUploading(true);

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // // Upload to your API endpoint
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error('Upload failed');
      // }

      // const data = await response.json();

      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Call onChange with the uploaded image URL
      // onChange(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      // You might want to show a toast here
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleRemove = useCallback(() => {
    setShowDialog(true);
  }, []);

  const confirmRemove = useCallback(() => {
    setPreview(null);
    setShowDialog(false);
  }, []);

  return (
    <div className={cn('space-y-4 w-full', className)}>
      <div className="flex flex-col items-center justify-center gap-4">
        {preview ? (
          <div className="relative w-36 h-36 group">
            <Image src={preview} alt="Preview" fill className="rounded-full object-cover" />
            <div className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button type="button" size="icon" onClick={handleRemove} variant="destructive">
                <Trash2 className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-36 h-36 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700">
            <Label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
            >
              {isUploading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <ImagePlus className="h-6 w-6" />
                  <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">Upload Image</span>
                </>
              )}
            </Label>
          </div>
        )}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <Input {...field} type="file" id="image-upload" className="hidden" onChange={handleUpload} />
          )}
        />
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Image</DialogTitle>
            <DialogDescription>Are you sure you want to remove this image?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmRemove}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUploadInput;
