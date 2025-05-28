'use client';
import {
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogContent,
  Dialog,
} from '@/components/ui/dialog';
import { Toast } from '@/lib/toast';
import FileGrid from './file-grid';
import { Plus } from 'lucide-react';
import FilePreview from './file-preivew';
import { FileUploadProps } from './types';
import { useState, useEffect } from 'react';
import FileUploadZone from './file-upload-zone';
import { Button } from '@/components/ui/button';
import { fileUpload } from '@/app/actions/files';
import { DialogClose } from '@radix-ui/react-dialog';
import { UploadFileQuery, UploadFilesQuery } from '@/lib/gql/graphql';

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
  refetch,
}) => {
  const [showFilesModal, setShowFilesModal] = useState(false);
  const [localSelectedFiles, setLocalSelectedFiles] = useState<
    UploadFilesQuery['uploadFiles']
  >([]);

  const [uploadingFiles, setUploadingFiles] = useState<Array<File>>([]);

  const handleFileSelect = (file: UploadFileQuery['uploadFile']) => {
    const isSelected = localSelectedFiles.some(
      (f) => f?.documentId === file?.documentId
    );
    let newFiles: UploadFilesQuery['uploadFiles'];

    if (isSelected) {
      newFiles = localSelectedFiles.filter(
        (f) => f?.documentId !== file?.documentId
      );
    } else {
      newFiles = [...localSelectedFiles, file].filter(
        (f): f is NonNullable<typeof f> => f != null
      );
    }

    setLocalSelectedFiles(newFiles);
  };

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return;
    setUploadingFiles(files);
    try {
      const uploadRes = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append('files', file);
          return fileUpload(formData);
        })
      );

      // Count successful uploads
      const successfulUploads = uploadRes.filter(
        (upload) => !upload.error
      ).length;

      // If there are successful uploads, remove that many items from uploadingFiles
      if (successfulUploads > 0) {
        setUploadingFiles((prev) => prev.slice(successfulUploads));
      }

      // Show error toast if any upload failed
      if (uploadRes.some((upload) => upload.error)) {
        Toast('Some files failed to upload. Please try again later.', 'ERROR');
      }

      refetch();
      Toast('Files uploaded successfully', 'SUCCESS');
    } catch (error) {
      Toast('Something went wrong. Please try again later.', 'ERROR');
    } finally {
    }
  };

  useEffect(() => {
    setLocalSelectedFiles(selectedFiles);

    return () => {
      setLocalSelectedFiles([]);
    };
  }, [selectedFiles]);

  useEffect(() => {
    return () => {
      // Cleanup object URLs when component unmounts
      uploadingFiles.forEach((file) => {
        if (file instanceof File && 'url' in file) {
          URL.revokeObjectURL((file as any).url);
        }
      });
    };
  }, [uploadingFiles]);

  return (
    <div className="w-full h-auto mx-auto">
      <div className="grid grid-cols-8 gap-4 items-center justify-center">
        {localSelectedFiles?.map((file) => (
          <FilePreview
            file={file}
            key={file?.documentId}
            onRemove={() => onFileRemove(file?.documentId || '')}
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
                maxFiles={15}
                uploadNewFileLabel={uploadNewFileLabel}
                onChange={uploadFiles}
              />
              <FileGrid
                data={[...uploadingFiles, ...data]}
                accept={accept}
                onSelect={handleFileSelect}
                selectedFiles={localSelectedFiles}
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
