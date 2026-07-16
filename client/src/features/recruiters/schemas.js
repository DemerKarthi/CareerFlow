import { z } from 'zod';

const urlSchema = z.union([
  z.literal(''),
  z.string().trim().url({ message: 'Please enter a valid URL' }),
]).optional();

export const recruiterSchema = z.object({
  companyId: z.string().min(1, { message: 'Company is required' }),
  name: z.string().trim().min(1, { message: 'Name is required' }),
  designation: z.string().optional(),
  email: z.union([
    z.literal(''),
    z.string().trim().email({ message: 'Please enter a valid email address' }),
  ]).optional(),
  phone: z.string().optional(),
  linkedinUrl: urlSchema,
  department: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
  isPrimaryContact: z.boolean().default(false),
});
