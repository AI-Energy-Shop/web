'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { IMAGE_TYPES } from '@/constant';
import { UploadFile } from '@/hooks/useProductDetails';
import { FileText } from 'lucide-react';

interface FileGridProps {
  files?: any[];
  selectedFiles: UploadFile[];
  onSelect: (file: UploadFile) => void;
  multiple?: boolean;
}

export function FileGrid({ files, selectedFiles, onSelect }: FileGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 w-full p-3">
      {files?.map?.((file) => (
        <div
          key={file.documentId}
          className={cn(
            'group relative aspect-square cursor-pointer rounded-lg overflow-hidden transition-all duration-200',
            selectedFiles.some((f) => f.documentId === file.documentId)
              ? 'ring-2 ring-primary/80 ring-offset-2 shadow-lg scale-[0.98] bg-primary/5'
              : 'border border-border/40 hover:border-primary/30 hover:shadow-md hover:scale-[1.02]'
          )}
          onClick={() => onSelect(file)}
        >
          {file?.mime === 'application/pdf' ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <div className="relative w-full h-[70%] mb-2">
                <iframe
                  src={file?.url || ''}
                  title={file?.name || ''}
                  className="absolute inset-0 w-full h-full opacity-10"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-primary/80" />
                </div>
              </div>
              <div className="w-full h-[30%] flex items-center justify-center">
                <p className="text-xs text-gray-600 font-medium truncate max-w-[90%]">PDF Document</p>
              </div>
            </div>
          ) : null}

          {IMAGE_TYPES.includes(file.mime) && (
            <Image
              fill
              src={file.url || ''}
              alt={file.alternativeText || ''}
              className="object-contain p-2 bg-gray-50"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
            <p className="text-[10px] text-white truncate">{file.name}</p>
          </div>
          <div
            className={cn(
              'absolute top-2 right-2 z-20 w-4 h-4 rounded-full border-2 transition-all duration-200',
              selectedFiles.some((f) => f.documentId === file.documentId)
                ? 'border-primary bg-primary scale-100'
                : 'border-gray-300 bg-white scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100'
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {selectedFiles.some((f) => f.documentId === file.documentId) && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
