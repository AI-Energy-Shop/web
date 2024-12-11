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
  accept = 'image/*',
  displayFiles = true,
  dataModalFilters,
  onUseExistingFile,
  onFileRemove,
  onSelectedFiles,
  uploadNewFileLabel,
  useExistingButtonLabel,
  data,
}) => {
  const [showFilesModal, setShowFilesModal] = useState(false);

  const handleUseExistingFile = () => {
    setShowFilesModal(!showFilesModal);
  };

  const handleSelectFiles = (files: FileType[]) => {
    onSelectedFiles(files);
    setShowFilesModal(!showFilesModal);
  };

  return (
    <div className="w-full h-auto mx-auto">
      {showFilesModal && (
        <Modal
          filters={dataModalFilters}
          onDone={handleSelectFiles}
          onCancel={() => setShowFilesModal(!showFilesModal)}
        />
      )}
      {data.length === 0 && (
        <FileUploadZone
          onFiles={() => {}}
          accept={accept}
          maxFiles={maxFiles}
          currentFiles={data.length}
          onUseExistingFile={handleUseExistingFile}
          uploadNewFileLabel={uploadNewFileLabel}
          useExistingButtonLabel={useExistingButtonLabel}
        />
      )}

      {data.length > 0 && (
        <div className="grid grid-cols-8 gap-4 px-1 py-3">
          {data.map((file) => (
            <FilePreview
              file={file}
              key={file.documentId}
              onRemove={() => onFileRemove(file.documentId)}
            />
          ))}
          <Button
            variant="outline"
            className="w-full h-full"
            onClick={handleUseExistingFile}
          >
            <Plus />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
