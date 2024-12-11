import React, { FC } from 'react';
import { CircleX } from 'lucide-react';
import { FilePreviewProps } from './types';
import { Button } from '@/components/ui/button';
import { IMAGE_TYPES } from '@/constant';
import Image from 'next/image';

const FilePreview: FC<FilePreviewProps> = ({ file, onRemove }) => {
  return (
    <div className="relative group">
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        {file.mime === 'application/pdf' && (
          <iframe
            src={file.url}
            className="w-full h-full object-cover"
            title="PDF Preview"
          />
        )}
        {IMAGE_TYPES.includes(file.mime) && (
          <Image
            src={file.url}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <Button
        onClick={() => onRemove(file.documentId)}
        size="sm"
        variant="outline"
        className="absolute -top-2 -right-2 rounded-full w-[20px] h-[20px] opacity-0 group-hover:opacity-100 hover:bg-gray-100 p-0"
      >
        <CircleX width={16} height={16} />
      </Button>

      <p className="mt-1 text-xs text-gray-500 truncate">{file.name}</p>
    </div>
  );
};

export default FilePreview;
