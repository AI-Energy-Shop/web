import { UploadFile } from '@/hooks/useProductDetails';

export type FileType = {
  __typename: string;
  id: number;
  documentId: string;
  alternativeText: string;
  url: string;
  mime: string;
  name: string;
};

export type FileUploadProps = {
  maxFiles?: number;
  accept?: string;
  data: UploadFile[];
  dataModalFilters: {
    mimeTypes: string[];
  };
  displayFiles?: boolean;
  displayUseExistingButton?: boolean;
  useExistingButtonLabel?: string;
  uploadNewFileLabel?: string;
  onUseExistingFile?: () => void;
  onSelectedFiles?: (files: UploadFile[]) => void;
  onFileRemove: (id: string) => void;
};

export type FileWithPreview = {
  file: UploadFile;
  preview: string;
};

export type FileUploadZoneProps = {
  onFiles?: (files: UploadFile[]) => void;
  onUseExistingFile?: () => void;
  accept: string;
  maxFiles: number;
  displayUseExistingFile?: boolean;
  useExistingButtonLabel?: string;
  uploadNewFileLabel?: string;
};

export type FilePreviewProps = {
  file: UploadFile;
  onRemove: (id: string) => void;
};

export interface ModalProps {
  accept: string;
  onCancel?: () => void;
  onDone: (files: UploadFile[]) => void;
  filters: {
    mimeTypes: string[];
  };
}
