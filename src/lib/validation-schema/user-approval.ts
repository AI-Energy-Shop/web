import { z } from 'zod';

export const userApprovalSchema = z.object({
  documentId: z.string().min(1, { message: 'Required' }),
  businessName: z.string().min(1, { message: 'Required' }),
  businessNumber: z.string().min(1, { message: 'Required' }),
  businessType: z.string().min(1, { message: 'Required' }),
  username: z.string().min(1, { message: 'Required' }),
  email: z.string().email(),
  street1: z.string().min(1, { message: 'Required' }),
  street2: z.string().min(1, { message: 'Required' }),
  city: z.string().min(1, { message: 'Required' }),
  state: z.string().min(1, { message: 'Required' }),
  zipCode: z.string().min(1, { message: 'Required' }),
  country: z.string().min(1, { message: 'Required' }),
  phone: z.string().min(1, { message: 'Required' }),
  userLevel: z.string().min(1, { message: 'Required' }),
  odooUserId: z.string().nullable(),
  accountStatus: z.string().min(1, { message: 'Required' }),
});
