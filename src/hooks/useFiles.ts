import FILES_OPERATIONS from '@/graphql/files';
import { UploadFilesQuery, UploadFilesQueryVariables } from '@/lib/gql/graphql';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

type UseFilesProps = {
  variables: UploadFilesQueryVariables;
};

const useFiles = ({ variables }: UseFilesProps) => {
  const [files, setFiles] = useState<UploadFilesQuery['uploadFiles']>([]);

  const { data, loading, refetch, error } = useQuery<
    UploadFilesQuery,
    UploadFilesQueryVariables
  >(FILES_OPERATIONS.Query.uploadFiles, {
    fetchPolicy: 'no-cache',
    variables,
  });

  useEffect(() => {
    if (data) {
      setFiles(data.uploadFiles);
    }

    return () => {
      setFiles([]);
    };
  }, [data]);

  return { files, loading, error, refetch };
};

export default useFiles;
