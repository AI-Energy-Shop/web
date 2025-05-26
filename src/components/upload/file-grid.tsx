'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { FileText } from 'lucide-react';
import { FilesQuery } from '@/lib/gql/graphql';
import LoadingAnimation from '../custom-ui/LoadingAnimation';

interface FileGridProps {
  accept?: string;
  data?: (FilesQuery['files'][number] | File)[];
  multiple?: boolean;
  selectedFiles: FilesQuery['files'];
  onSelect: (file: FilesQuery['files'][number]) => void;
}

const FileGrid: React.FC<FileGridProps> = ({
  data,
  accept,
  selectedFiles,
  onSelect,
}) => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full grid grid-cols-8 gap-3 p-3 min-h-full">
        {data?.map?.((file, index) => {
          if (file instanceof File) {
            return (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border border-border/40"
              >
                <LoadingAnimation />
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={file?.documentId}
                className={cn(
                  'group relative aspect-square cursor-pointer rounded-lg overflow-hidden transition-all duration-200',
                  selectedFiles?.some((f) => f?.documentId === file?.documentId)
                    ? 'ring-2 ring-green-500/80 ring-offset-2 shadow-lg scale-[0.98] bg-green-50'
                    : 'border border-border/40 hover:border-primary/30 hover:shadow-md hover:scale-[1.02]'
                )}
                onClick={() => onSelect(file)}
              >
                {file?.mime.includes(accept || '') ? (
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
                      <p className="text-xs text-gray-600 font-medium truncate max-w-[90%]">
                        PDF Document
                      </p>
                    </div>
                  </div>
                ) : null}

                {file?.mime.includes('image') && (
                  <Image
                    fill
                    src={file?.url || '/no-product-image.jpg'}
                    alt={file?.alternativeText || ''}
                    className="object-contain p-2 bg-gray-50"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-[10px] text-white truncate">
                    {file?.name}
                  </p>
                </div>
                <div
                  className={cn(
                    'absolute top-2 right-2 z-20 w-4 h-4 rounded-full border-2 transition-all duration-200',
                    selectedFiles?.some(
                      (f) => f?.documentId === file?.documentId
                    )
                      ? ' bg-green-500 scale-100'
                      : 'border-gray-300 bg-white scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100'
                  )}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {selectedFiles?.some(
                      (f) => f?.documentId === file?.documentId
                    ) && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default FileGrid;
