import { z } from 'zod';
import { INTERVIEW_TYPE, INTERVIEW_MODE, INTERVIEW_STATUS, INTERVIEW_RESULT } from './constants';

const urlSchema = z.union([
  z.literal(''),
  z.string().trim().url({ message: 'Please enter a valid URL' }),
]).optional();

export const interviewSchema = z.object({
  applicationId: z.string().min(1, { message: 'Application is required' }),
  recruiterId: z.string().optional().nullable(),
  roundName: z.string().trim().min(1, { message: 'Round name is required' }),
  roundNumber: z.coerce.number().min(1, { message: 'Round number must be at least 1' }),
  interviewType: z.nativeEnum(INTERVIEW_TYPE, { errorMap: () => ({ message: 'Interview type is required' }) }),
  mode: z.nativeEnum(INTERVIEW_MODE).optional().nullable(),
  scheduledAt: z.string().min(1, { message: 'Scheduled date is required' }),
  duration: z.coerce.number().min(1, { message: 'Duration must be greater than zero' }).optional().nullable(),
  interviewerName: z.string().optional(),
  interviewerDesignation: z.string().optional(),
  meetingLink: urlSchema,
  location: z.string().optional(),
  status: z.nativeEnum(INTERVIEW_STATUS).default(INTERVIEW_STATUS.SCHEDULED),
  result: z.nativeEnum(INTERVIEW_RESULT).default(INTERVIEW_RESULT.PENDING),
  feedback: z.string().optional(),
  rating: z.coerce.number().min(1).max(5).optional().nullable(),
  nextRoundDate: z.string().optional(),
  notes: z.string().optional(),
}).refine(data => {
  if (data.scheduledAt && data.nextRoundDate) {
    return new Date(data.nextRoundDate) >= new Date(data.scheduledAt);
  }
  return true;
}, {
  message: 'Next round date cannot be earlier than scheduled date',
  path: ['nextRoundDate'],
});
