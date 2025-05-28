import FILES_OPERATIONS from '@/graphql/files';
import { FilesQuery } from '@/lib/gql/graphql';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

type UseFilesProps = {
  filters: {
    mime: {
      contains: string;
    };
  };
  sort?: string[];
};

const useFiles = ({ filters, sort }: UseFilesProps) => {
  const [files, setFiles] = useState<FilesQuery['files']>([]);

  const { data, loading, refetch } = useQuery(FILES_OPERATIONS.Query.files, {
    fetchPolicy: 'network-only',
    variables: {
      filters,
      sort,
    },
  });

  useEffect(() => {
    if (data) {
      setFiles(data.files);
    }

    return () => {
      setFiles([]);
    };
  }, [data]);

  return { files, loading, refetch };
};

export default useFiles;
