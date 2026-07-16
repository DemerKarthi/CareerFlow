import { z } from 'zod';
import { TASK_TYPE, TASK_PRIORITY, TASK_STATUS } from './constants';

export const taskSchema = z.object({
  applicationId: z.string().optional().nullable(),
  interviewId: z.string().optional().nullable(),
  title: z.string().trim().min(1, { message: 'Title is required' }),
  description: z.string().optional().nullable(),
  taskType: z.nativeEnum(TASK_TYPE, { errorMap: () => ({ message: 'Task type is required' }) }),
  priority: z.nativeEnum(TASK_PRIORITY).default(TASK_PRIORITY.MEDIUM),
  status: z.nativeEnum(TASK_STATUS).default(TASK_STATUS.PENDING),
  dueDate: z.string().min(1, { message: 'Due date is required' }),
  reminderAt: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
}).refine(data => {
  if (data.dueDate && data.reminderAt) {
    return new Date(data.reminderAt) <= new Date(data.dueDate);
  }
  return true;
}, {
  message: 'Reminder cannot be later than due date',
  path: ['reminderAt'],
});
