'use server';
import { cookies } from 'next/headers';

export const filesUpload = async (formData: FormData) => {
  const cookieStore = cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_PROTOCOL}://${process.env.NEXT_PUBLIC_BASE_URL_HOST}/api/upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.error('Error in filesUpload:', error.message);
    throw error;
  }
};
