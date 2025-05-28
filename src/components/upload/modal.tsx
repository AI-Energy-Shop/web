'use client';
import FILES_OPERATIONS from '@/graphql/files';
import { useQuery } from '@apollo/client';
import { FC, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Modal: FC<any> = ({ onDone, onCancel, filters, accept }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedImageIds, setSelectedImageIds] = useState<any[]>([]);

  const { loading, refetch } = useQuery(FILES_OPERATIONS.Query.files, {
    fetchPolicy: 'no-cache',
    variables: {
      filters: {
        mimeTypes: filters.mimeTypes,
      },
    },
    onCompleted: (data) => {
      setFiles(data.files);
    },
  });

  const handleOnClick = (file: any) => {
    setSelectedImageIds((prevArray) =>
      prevArray.some((f) => f.documentId === file.documentId)
        ? prevArray.filter((imageId) => imageId.documentId !== file.documentId)
        : prevArray.concat(file)
    );
  };

  const handleOnUploadFiles = (data: any[]) => {
    setFiles(files.concat(data));
    refetch();
  };

  if (loading) {
    return <h1>LOADING</h1>;
  }

  return (
    <div className="bg-black bg-opacity-40 w-full h-full fixed m-0 top-0 left-0 z-50 flex items-center justify-center">
      <div className="w-[50%] h-[80%] rounded-md bg-white flex flex-col">
        <Card className="w-full h-full border-none shadow-none p-0 flex flex-col">
          <CardHeader className="flex-shrink-0">
            {/* <FileUploadZone
              accept={`${accept}`}
              onFiles={handleOnUploadFiles}
              maxFiles={10}
              displayUseExistingFile={false}
            /> */}
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            {/* <FileGrid
              files={files}
              selectedFiles={selectedImageIds}
              onSelect={handleOnClick}
            /> */}
          </CardContent>
          <CardFooter className="flex-shrink-0 justify-end space-x-2">
            <Button type="button" onClick={onCancel} variant="destructive">
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => onDone(selectedImageIds)}
              variant="outline"
            >
              Done
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
