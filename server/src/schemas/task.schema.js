import { TASK_TYPE, TASK_PRIORITY, TASK_STATUS } from '../constants/task.constants.js';

export const taskSchema = (data) => {
  const errors = [];
  const {
    title,
    taskType,
    priority,
    status,
    dueDate,
    reminderAt,
    completedAt,
  } = data;

  if (!title || title.trim() === '') {
    errors.push('Title is required');
  }

  if (!taskType || !Object.values(TASK_TYPE).includes(taskType)) {
    errors.push('Valid task type is required');
  }

  if (!priority || !Object.values(TASK_PRIORITY).includes(priority)) {
    errors.push('Valid priority is required');
  }

  if (status && !Object.values(TASK_STATUS).includes(status)) {
    errors.push('Invalid task status');
  }

  if (!dueDate) {
    errors.push('Due date is required');
  } else if (isNaN(new Date(dueDate).getTime())) {
    errors.push('Due date must be a valid date');
  }

  if (reminderAt && dueDate) {
    const reminder = new Date(reminderAt);
    const due = new Date(dueDate);
    if (reminder.toString() !== 'Invalid Date' && due.toString() !== 'Invalid Date') {
      if (reminder > due) {
        errors.push('Reminder cannot be later than the due date');
      }
    }
  }

  if (completedAt && status !== TASK_STATUS.COMPLETED) {
    errors.push('Completed date can only be set when status is Completed');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const taskStatusSchema = (data) => {
  const errors = [];

  if (!data.status) {
    errors.push('Status is required');
  } else if (!Object.values(TASK_STATUS).includes(data.status)) {
    errors.push('Invalid task status');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
