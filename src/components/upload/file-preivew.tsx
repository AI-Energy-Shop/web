import Image from 'next/image';
import { cn } from '@/lib/utils';
import React, { FC } from 'react';
import { FilePreviewProps } from './types';
import { Button } from '@/components/ui/button';
import { CircleX, FileText } from 'lucide-react';

const FilePreview: FC<FilePreviewProps> = ({ file, onRemove }) => {
  return (
    <div className="relative group">
      <div
        className={cn(
          'aspect-square rounded-lg overflow-hidden',
          file.mime === 'application/pdf'
            ? 'bg-white border border-border/40'
            : 'bg-gray-50'
        )}
      >
        {file.mime.includes('application/pdf') && (
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <div className="relative w-full h-[70%] mb-2">
              <iframe
                src={file.url}
                className="absolute inset-0 w-full h-full opacity-10"
                title="PDF Preview"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="w-12 h-12 text-primary/80" />
              </div>
            </div>
            <div className="w-full h-[30%] flex items-center justify-center">
              <p className="text-xs text-gray-600 font-medium truncate max-w-[90%]">
                PDF Document
              </p>
            </div>
          </div>
        )}
        {file.mime.includes('image') && (
          <Image
            src={file.url}
            alt="Preview"
            className="w-full h-full object-contain p-2"
            width={90}
            height={90}
          />
        )}
      </div>

      <Button
        onClick={() => onRemove(file.documentId)}
        size="sm"
        variant="outline"
        type="button"
        className="absolute -top-2 -right-2 rounded-full w-[20px] h-[20px] opacity-0 group-hover:opacity-100 hover:bg-gray-100 p-0 transition-all duration-200"
      >
        <CircleX width={16} height={16} />
      </Button>

      <p className="mt-2 text-xs text-gray-600 truncate text-center">
        {file.name}
      </p>
    </div>
  );
};

export default FilePreview;
