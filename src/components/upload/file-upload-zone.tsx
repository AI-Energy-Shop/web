'use client';
import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { Toast } from '@/lib/toast';

type FileUploadZoneProps = {
  accept?: string;
  maxFiles: number;
  uploadNewFileLabel?: string;
  onChange?: (files: File[]) => void;
};

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  accept,
  maxFiles,
  uploadNewFileLabel = 'Upload new file',
  onChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length > maxFiles) {
        Toast(`Maximum ${maxFiles} files allowed`, 'ERROR');
        return;
      }

      onChange?.(droppedFiles);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxFiles]
  );

  const handleFileInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > maxFiles) {
        Toast(`Maximum ${maxFiles} files allowed`, 'ERROR');
        return;
      }

      onChange?.(files);
      e.target.value = '';
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxFiles]
  );

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-2 text-center transition-colors duration-200 ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-blue-300 hover:border-3 hover:border-blue-400 bg-blue-50'
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
          </div>
          <p className="text-xs text-gray-500">
            {accept === 'image/*' ? ' PNG, JPG or GIF ' : 'Supported files'}
            {accept === 'application/pdf' && ' PDF '}
          </p>
        </div>
      </div>

      <input
        multiple
        type="file"
        name="files"
        id="fileInput"
        className="hidden"
        onChange={handleFileInputChange}
        accept={accept}
        disabled={isUploading}
      />
    </div>
  );
};

export default FileUploadZone;
