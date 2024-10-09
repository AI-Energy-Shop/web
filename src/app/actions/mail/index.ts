'use server';
import zod from 'zod';

export async function sendInquiry(formData: FormData) {
  const fullName = formData.get('fullName');
  const companyName = formData.get('companyName');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const message = formData.get('message');
  const postal = formData.get('postal');
  const who = formData.get('who');

  const inquiry = zod.object({
    fullName: zod.string(),
    companyName: zod.string(),
    email: zod.string(),
    phone: zod.string(),
    message: zod.string(),
    postal: zod.string(),
    who: zod.string(),
  });

  try {
    inquiry.parse({
      fullName,
      companyName,
      email,
      phone,
      message,
      postal,
      who,
    });

    return {
      data: {},
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      error: error.message,
    };
  }
}

export async function subscribeToNews(formData: FormData) {
  const fullName = formData.get('fullName');
  const companyName = formData.get('companyName');
  const email = formData.get('email');

  const inquiry = zod.object({
    fullName: zod.string(),
    companyName: zod.string(),
    email: zod.string(),
  });

  try {
    inquiry.parse({
      fullName,
      companyName,
      email,
    });

    return {
      data: {},
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      error: error.message,
    };
  }
}
