import { z } from 'zod';

export const userApprovalSchema = z.object({
  documentId: z.string().min(1, { message: 'Required' }),
  businessName: z.string().min(1, { message: 'Required' }),
  businessNumber: z.string().min(1, { message: 'Required' }),
  username: z.string().min(1, { message: 'Required' }),
  email: z.string().email(),
  street: z.string().min(1, { message: 'Required' }),
  suburb: z.string().min(1, { message: 'Required' }),
  state: z.string().min(1, { message: 'Required' }),
  postalCode: z.string().min(1, { message: 'Required' }),
  phone: z.string().min(1, { message: 'Required' }),
  userType: z.string().min(1, { message: 'Required' }),
  userLevel: z.string().min(1, { message: 'Required' }),
  odooUserId: z.string().min(1, { message: 'Required' }),
  accountStatus: z.string().min(1, { message: 'Required' }),
});
