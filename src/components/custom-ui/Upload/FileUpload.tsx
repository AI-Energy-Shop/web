'use client';
import { FileUploadZone } from './FileUploadZone';
import { FileType, FileUploadProps } from './types';
import FilePreview from './FilePreview';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import Modal from './Modal';

const FileUpload: React.FC<FileUploadProps> = ({
  maxFiles = 5,
  accept,
  displayFiles = true,
  dataModalFilters,
  onFileRemove,
  onSelectedFiles,
  uploadNewFileLabel,
  useExistingButtonLabel,
  data,
}) => {
  const [showFilesModal, setShowFilesModal] = useState(false);

  const handleSelectFilesFromModal = (files: FileType[] | null | undefined) => {
    if (!files || files.length === 0) {
      console.warn('No files selected');
      return;
    }

    try {
      const newFiles = files?.map((file) => {
        return {
          documentId: file.documentId,
          url: file.url,
          mime: file.mime,
          name: file.name,
          __typename: file.__typename,
          id: file.id,
          alternativeText: file.alternativeText,
        };
      });
      onSelectedFiles?.(newFiles);
    } catch (error) {
      console.error('Failed to select files:', error);
    } finally {
      setShowFilesModal(!showFilesModal);
    }
  };

  return (
    <div className="w-full h-auto mx-auto">
      {data?.length === 0 && (
        <FileUploadZone
          onFiles={onSelectedFiles}
          accept={accept || ''}
          maxFiles={maxFiles}
          onUseExistingFile={() => setShowFilesModal(!showFilesModal)}
          uploadNewFileLabel={uploadNewFileLabel}
          useExistingButtonLabel={useExistingButtonLabel}
        />
      )}

      {data?.length > 0 && (
        <div className="grid grid-cols-8 gap-4 px-1 py-3">
          {data.map((file) => (
            <FilePreview file={file} key={file.documentId} onRemove={() => onFileRemove(file.documentId)} />
          ))}
          <Button variant="outline" className="w-full h-full" onClick={() => setShowFilesModal(!showFilesModal)}>
            <Plus />
          </Button>
        </div>
      )}

      {showFilesModal && (
        <Modal
          filters={dataModalFilters}
          onDone={handleSelectFilesFromModal}
          onCancel={() => setShowFilesModal(!showFilesModal)}
        />
      )}
    </div>
  );
};

export default FileUpload;
