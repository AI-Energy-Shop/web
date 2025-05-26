import FILES_OPERATIONS from '@/graphql/files';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

type UseFilesProps = {
  filters: {
    mime: {
      contains: string;
    };
  };
};

const useFiles = ({ filters }: UseFilesProps) => {
  const [files, setFiles] = useState<any[]>([]);

  const { data, loading } = useQuery(FILES_OPERATIONS.Query.uploadFiles, {
    fetchPolicy: 'network-only',
    variables: {
      filters,
    },
  });

  useEffect(() => {
    if (data) {
      setFiles(data.uploadFiles);
    }

    return () => {
      setFiles([]);
    };
  }, [data]);

  return { files, loading };
};

export default useFiles;
