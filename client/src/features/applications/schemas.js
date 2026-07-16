import { z } from 'zod';
import { 
  APPLICATION_STATUS, 
  APPLICATION_STAGE, 
  APPLICATION_PRIORITY, 
  APPLICATION_PLATFORM, 
  EMPLOYMENT_TYPE 
} from './constants';

const urlSchema = z.union([
  z.literal(''),
  z.string().trim().url({ message: 'Please enter a valid URL' })
]).optional();

export const applicationSchema = z.object({
  companyId: z.string().min(1, { message: 'Company is required' }),
  jobTitle: z.string().trim().min(1, { message: 'Job title is required' }),
  jobId: z.string().optional(),
  jobUrl: urlSchema,
  platform: z.nativeEnum(APPLICATION_PLATFORM).optional(),
  employmentType: z.nativeEnum(EMPLOYMENT_TYPE).optional(),
  salaryMin: z.coerce.number().optional().nullable(),
  salaryMax: z.coerce.number().optional().nullable(),
  currency: z.string().max(3).optional(),
  applicationDate: z.string().optional(), // Using string for date input compatibility
  currentStage: z.nativeEnum(APPLICATION_STAGE).default(APPLICATION_STAGE.WISHLIST),
  priority: z.nativeEnum(APPLICATION_PRIORITY).default(APPLICATION_PRIORITY.MEDIUM),
  applicationStatus: z.nativeEnum(APPLICATION_STATUS).default(APPLICATION_STATUS.ACTIVE),
  recruiterName: z.string().optional(),
  recruiterEmail: z.union([
    z.literal(''),
    z.string().trim().email({ message: 'Please enter a valid email address' })
  ]).optional(),
  recruiterPhone: z.string().optional(),
  nextFollowUp: z.string().optional(),
  interviewDate: z.string().optional(),
  source: z.nativeEnum(APPLICATION_PLATFORM).optional(),
  notes: z.string().optional(),
}).refine(data => {
  if (data.salaryMin !== undefined && data.salaryMax !== undefined && data.salaryMin !== null && data.salaryMax !== null) {
    return data.salaryMin <= data.salaryMax;
  }
  return true;
}, {
  message: "Minimum salary cannot exceed maximum salary",
  path: ["salaryMin"],
}).refine(data => {
  if (data.applicationDate && data.nextFollowUp) {
    return new Date(data.nextFollowUp) >= new Date(data.applicationDate);
  }
  return true;
}, {
  message: "Next follow-up cannot be earlier than application date",
  path: ["nextFollowUp"],
});
