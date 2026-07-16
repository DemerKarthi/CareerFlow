import { z } from 'zod';
import { COMPANY_STATUS, COMPANY_PRIORITY, WORK_MODE } from './constants';

const urlSchema = z.union([
  z.literal(''),
  z.string().trim().url({ message: 'Please enter a valid URL' })
]).optional();

export const companySchema = z.object({
  companyName: z.string().trim().min(1, { message: 'Company name is required' }),
  website: urlSchema,
  linkedinUrl: urlSchema,
  careerPage: urlSchema,
  industry: z.string().optional(),
  companySize: z.string().optional(),
  headquarters: z.string().optional(),
  location: z.string().optional(),
  workMode: z.nativeEnum(WORK_MODE).optional(),
  status: z.nativeEnum(COMPANY_STATUS).default(COMPANY_STATUS.INTERESTED),
  priority: z.nativeEnum(COMPANY_PRIORITY).default(COMPANY_PRIORITY.MEDIUM),
  notes: z.string().max(1000, { message: 'Notes must not exceed 1000 characters' }).optional(),
});
