'use client';
import React, { useCallback, useRef } from 'react';
import { Upload } from 'lucide-react';
import { FileType, FileUploadZoneProps } from './types';
import { filesUpload } from '@/app/actions/files';
import { Button } from '@/components/ui/button';
import { Toast } from '@/lib/toast';

export function FileUploadZone({
  onFiles,
  accept,
  maxFiles,
  displayUseExistingFile = true,
  useExistingButtonLabel = 'Use existing file',
  uploadNewFileLabel = 'Upload new file',
  onUseExistingFile,
}: FileUploadZoneProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const droppedFiles = e.dataTransfer.files as unknown as FileType[];
      onFiles?.(droppedFiles);

      // Trigger form submission automatically
      formRef.current?.requestSubmit();
    },
    [maxFiles, onFiles]
  );

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      // Trigger form submission automatically
      formRef.current?.requestSubmit();

      // Reset input
      e.target.value = '';
    },
    [onFiles]
  );

  const handleFormSubmit = async (form: React.FormEvent<HTMLFormElement>) => {
    form.preventDefault(); // Prevent the default form submission

    // Get the form element
    const formElement = form.target as HTMLFormElement;

    // Create a FormData object from the form
    const formData = new FormData(formElement);

    try {
      const fileUploadRes = await filesUpload(formData);
      if (fileUploadRes) {
        onFiles?.(fileUploadRes);
        Toast('File uploaded successfully', 'SUCCESS');
      }
    } catch (error) {
      Toast('Something went wrong. Please try again later.', 'ERROR');
    }
  };

  const handleUseExistingFileClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    onUseExistingFile?.(); // Call the onUseExistingFile handler
  };

  return (
    <>
      <form
        ref={formRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onSubmit={handleFormSubmit}
        className={`border-2 border-dashed rounded-lg p-2 text-center border-blue-300 hover:border-blue-400 bg-blue-50`}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-1 bg-blue-100 rounded-full">
            <Upload className="w-5 h-5 text-blue-600" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-5">
              <p className="text-sm font-medium text-gray-700 flex items-center justify-center">
                <label
                  htmlFor="fileInput"
                  className="text-black cursor-pointer text-xs border-b border-primary "
                >
                  {uploadNewFileLabel}
                </label>
              </p>
              {displayUseExistingFile && (
                <p className="text-sm font-medium text-gray-700 ">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-black cursor-pointer text-xs"
                    onClick={handleUseExistingFileClick}
                  >
                    {useExistingButtonLabel}
                  </Button>
                </p>
              )}
            </div>
            <p className="text-xs text-gray-500">
              {accept === 'image/*' ? ' PNG, JPG or GIF ' : 'Supported files'}
              {accept === 'application/pdf' && ' PDF '}
            </p>
          </div>
        </div>

        <input
          type="file"
          name="files"
          id="fileInput"
          className="hidden"
          onChange={handleFileInput}
          accept={accept}
          multiple
        />
        <button type="submit" className="hidden" id="uploadSubmit" />
      </form>
    </>
  );
}
