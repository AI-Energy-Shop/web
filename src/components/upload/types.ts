import {
  FilesQuery,
  UploadFileQuery,
  UploadFilesQuery,
} from '@/lib/gql/graphql';

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
  selectedFiles: UploadFilesQuery['uploadFiles'];
  data: UploadFilesQuery['uploadFiles'] | File[];
  dataModalFilters: {
    mimeTypes: string[];
  };
  displayFiles?: boolean;
  displayUseExistingButton?: boolean;
  useExistingButtonLabel?: string;
  uploadNewFileLabel?: string;
  title?: string;
  onUseExistingFile?: () => void;
  onFileRemove: (id: string) => void;
  onSave: (files: any[]) => void;
  refetch: () => void;
};

export type FileWithPreview = {
  file: any;
  preview: string;
};

export type FileUploadZoneProps = {
  onFiles?: (files: any[]) => void;
  onUseExistingFile?: () => void;
  accept: string;
  maxFiles: number;
  displayUseExistingFile?: boolean;
  useExistingButtonLabel?: string;
  uploadNewFileLabel?: string;
};

export type FilePreviewProps = {
  isSelected?: boolean;
  file: UploadFileQuery['uploadFile'];
  onRemove?: (id: string) => void;
};

export interface ModalProps {
  accept: string;
  onCancel?: () => void;
  onDone: (files: any[]) => void;
  filters: {
    mimeTypes: string[];
  };
}
