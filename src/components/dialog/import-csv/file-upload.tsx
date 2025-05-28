'use client';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useCallback, useRef, useState } from 'react';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type MouseEvent = React.MouseEvent<HTMLButtonElement>;
type DragEvent = React.DragEvent<HTMLDivElement>;

interface FileUploadProps {
  accept: string;
  maxFiles: number;
  displayUseExistingFile?: boolean;
  useExistingButtonLabel?: string;
  uploadNewFileLabel?: string;
  onInputChange: (e: InputChangeEvent) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  maxFiles,
  displayUseExistingFile = true,
  useExistingButtonLabel = 'Use existing file',
  uploadNewFileLabel = 'Upload new file',
  onInputChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // TODO: RUENT
  const handleDragOver = useCallback((e: DragEvent) => {}, []);

  // TODO: RUENT
  const handleDragLeave = useCallback((e: DragEvent) => {}, []);

  // TODO: RUENT
  const handleDrop = useCallback(async (e: DragEvent) => {}, []);

  // TODO: RUENT
  const handleUseExistingFileClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-2 text-center transition-colors duration-200 ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-blue-300 hover:border-blue-400 bg-blue-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
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
                className={`text-black cursor-pointer text-xs border-b border-primary hover:text-primary transition-colors ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploadNewFileLabel}
              </label>
            </p>
            {displayUseExistingFile && (
              <p className="text-sm font-medium text-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-black cursor-pointer text-xs"
                  onClick={handleUseExistingFileClick}
                  disabled={isUploading}
                >
                  {useExistingButtonLabel}
                </Button>
              </p>
            )}
          </div>
          <p className="text-xs text-gray-500">
            {accept === 'image/*' ? ' PNG, JPG or GIF ' : 'Supported files'}
            {accept === 'application/pdf' && ' PDF '}
            {accept === 'text/csv' && ' CSV '}
          </p>
        </div>
      </div>

      <input
        multiple
        type="file"
        name="files"
        id="fileInput"
        accept={accept}
        className="hidden"
        disabled={isUploading}
        onChange={onInputChange}
      />
    </div>
  );
};

export default FileUpload;
