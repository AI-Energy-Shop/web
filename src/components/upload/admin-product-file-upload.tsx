'use client';
import FilePreview from './file-preivew';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FileUploadProps } from './types';
import { Button } from '@/components/ui/button';
import {
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogContent,
  Dialog,
} from '@/components/ui/dialog';
import FileUploadZone from './file-upload-zone';
import FileGrid from './file-grid';
import { DialogClose } from '@radix-ui/react-dialog';

const AdminProductFileUpload: React.FC<FileUploadProps> = ({
  title,
  data,
  selectedFiles,
  accept,
  maxFiles = 5,
  dataModalFilters,
  uploadNewFileLabel,
  useExistingButtonLabel,
  onFileRemove,
  onSave,
}) => {
  const [showFilesModal, setShowFilesModal] = useState(false);
  const [localSelectedFiles, setLocalSelectedFiles] = useState<any[]>([]);

  const handleFileSelect = (file: any) => {
    const isSelected = localSelectedFiles.some(
      (f) => f.documentId === file.documentId
    );
    let newFiles;

    if (isSelected) {
      newFiles = localSelectedFiles.filter(
        (f) => f.documentId !== file.documentId
      );
    } else {
      newFiles = [...localSelectedFiles, file];
    }

    setLocalSelectedFiles(newFiles);
  };

  useEffect(() => {
    setLocalSelectedFiles(selectedFiles);
  }, [selectedFiles]);

  return (
    <div className="w-full h-auto mx-auto">
      <div className="grid grid-cols-8 gap-4 items-center justify-center">
        {localSelectedFiles.map((file) => (
          <FilePreview
            file={file}
            key={file.documentId}
            onRemove={() => onFileRemove(file.documentId)}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          className="w-[80px] h-[80px]"
          onClick={() => setShowFilesModal(!showFilesModal)}
        >
          <Plus />
        </Button>
      </div>

      {showFilesModal && (
        <Dialog open={showFilesModal} onOpenChange={setShowFilesModal}>
          <DialogContent className="max-w-[900px]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                Select files to add to your product.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4  max-h-[70vh]">
              <FileUploadZone
                accept={accept}
                maxFiles={maxFiles}
                uploadNewFileLabel={uploadNewFileLabel}
                onFiles={(data) => {
                  console.log(data);
                }}
              />
              <FileGrid
                data={data}
                selectedFiles={localSelectedFiles}
                onSelect={handleFileSelect}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" size="sm" variant="destructive">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  onSave(localSelectedFiles);
                  setShowFilesModal(false);
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminProductFileUpload;
