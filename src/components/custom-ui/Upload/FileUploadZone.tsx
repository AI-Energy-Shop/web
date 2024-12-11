import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { FileUploadZoneProps } from './types';
import { filesUpload } from '@/app/actions/files';
import { Button } from '@/components/ui/button';

export function FileUploadZone({
  onFiles,
  accept,
  maxFiles,
  currentFiles,
  displayUseExistingFile = true,
  useExistingButtonLabel = 'Use existing file',
  uploadNewFileLabel = 'Upload new file',
  onUseExistingFile,
}: FileUploadZoneProps) {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const remainingSlots = maxFiles - currentFiles;
      if (remainingSlots <= 0) return;

      const droppedFiles = e.dataTransfer.files;
      onFiles(droppedFiles);
    },
    [maxFiles, currentFiles, onFiles]
  );

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      const formData = new FormData();

      if (files == null) return;
      formData.append('files', files[0]);
      const uploadRes = await filesUpload(formData);

      onFiles(files);
      e.target.value = ''; // Reset input
    },
    [onFiles]
  );

  const remainingSlots = maxFiles - currentFiles;
  const isDisabled = remainingSlots <= 0;

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={!isDisabled ? handleDrop : undefined}
        className={`border-2 border-dashed rounded-lg p-2 text-center ${isDisabled ? 'border-gray-300 bg-gray-50' : 'border-blue-300 hover:border-blue-400 bg-blue-50'}`}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-1 bg-blue-100 rounded-full">
            <Upload className="w-5 h-5 text-blue-600" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-5">
              <p className="text-sm font-medium text-gray-700 flex items-center justify-center">
                {isDisabled ? (
                  'Maximum files reached'
                ) : (
                  <>
                    <label
                      htmlFor="fileInput"
                      className="text-black cursor-pointer text-xs border-b border-primary "
                    >
                      {uploadNewFileLabel}
                    </label>
                  </>
                )}
              </p>
              {displayUseExistingFile && (
                <p className="text-sm font-medium text-gray-700 ">
                  {isDisabled ? (
                    'Maximum files reached'
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-black cursor-pointer text-xs"
                        onClick={onUseExistingFile}
                      >
                        {useExistingButtonLabel}
                      </Button>
                    </>
                  )}
                </p>
              )}
            </div>
            <p className="text-xs text-gray-500">
              {accept === 'image/*' ? ' PNG, JPG or GIF ' : 'Supported files'}
              {accept === 'application/pdf'
                ? ' PDF '
                : 'Supported files'} up to 10MB
            </p>
            {!isDisabled && (
              <p className="text-xs text-gray-500">
                {remainingSlots} {remainingSlots === 1 ? 'slot' : 'slots'}{' '}
                remaining
              </p>
            )}
          </div>
        </div>

        <input
          type="file"
          name="files"
          id="fileInput"
          className="hidden"
          onChange={handleFileInput}
          accept={accept}
          multiple={remainingSlots > 1}
          disabled={isDisabled}
        />
        <button type="submit" className="hidden" id="uploadSubmit" />
      </div>
    </>
  );
}
