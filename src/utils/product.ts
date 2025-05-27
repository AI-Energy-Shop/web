export const getProductStatus = (publishedAt: string | null | undefined) => {
  if (!publishedAt)
    return { status: 'Draft', color: 'bg-gray-100 text-gray-800' };

  const publishDate = new Date(publishedAt);
  const now = new Date();

  if (publishDate > now) {
    return { status: 'Scheduled', color: 'bg-blue-100 text-blue-800' };
  } else {
    return { status: 'Published', color: 'bg-green-100 text-green-800' };
  }
};
