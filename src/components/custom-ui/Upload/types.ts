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
  data: FileType[];
  dataModalFilters: {
    mimeTypes: string[];
  };
  displayFiles?: boolean;
  displayUseExistingButton?: boolean;
  useExistingButtonLabel?: string;
  uploadNewFileLabel?: string;
  onUseExistingFile?: () => void;
  onSelectedFiles: (files: FileType[]) => void;
  onFileRemove: (id: string) => void;
};

export type FileWithPreview = {
  file: FileType;
  preview: string;
};

export type FileUploadZoneProps = {
  onFiles: (files: FileList | null) => void;
  onUseExistingFile?: () => void;
  accept: string;
  maxFiles: number;
  currentFiles: number;
  displayUseExistingFile?: boolean;
  useExistingButtonLabel?: string;
  uploadNewFileLabel?: string;
};

export type FilePreviewProps = {
  file: FileType;
  onRemove: (id: string) => void;
};

export interface ModalProps {
  filters: {
    mimeTypes: string[];
  };
  onCancel?: () => void;
  onDone: (files: FileType[]) => void;
}
