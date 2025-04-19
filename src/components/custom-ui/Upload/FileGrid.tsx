'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { FileType } from './types';
import { IMAGE_TYPES } from '@/constant';

interface FileGridProps {
  files?: any[];
  selectedFiles: FileType[];
  onSelect: (file: FileType) => void;
  multiple?: boolean;
}

export function FileGrid({ files, selectedFiles, onSelect }: FileGridProps) {
  return (
    <div className="grid grid-cols-6 gap-4 w-full h-full">
      {files?.map?.((file) => (
        <div
          key={file.documentId}
          className={cn(
            'group relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all',
            selectedFiles.some((f) => f.documentId === file.documentId)
              ? 'border-primary ring-2 ring-primary ring-offset-2'
              : 'border-border hover:border-primary/50'
          )}
          onClick={() => onSelect(file)}
        >
          {IMAGE_TYPES.includes(file.mime) && (
            <Image
              fill
              src={file.url || ''}
              alt={file.alternativeText || ''}
              className="object-cover z-0"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          )}

          {file?.mime === 'application/pdf' && (
            <iframe src={file?.url || ''} title={file?.name || ''} className="h-full object-center z-0" />
          )}
          <div className="bg-black w-full h-full z-10" />
          <p className="absolute bottom-0 z-[9] text-[10px] hidden group-hover:block p-1 text-white">{file.name}</p>
          {/* <div className="absolute top-2 left-2 z-20">
            <Checkbox className="border-gray-400" />
          </div> */}
        </div>
      ))}
    </div>
  );
}
