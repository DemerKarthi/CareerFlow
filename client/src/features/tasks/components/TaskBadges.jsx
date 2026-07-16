import React from 'react';
import { Badge } from '../../../components/ui/badge';
import { TASK_STATUS, TASK_PRIORITY } from '../constants';

export const TaskStatusBadge = ({ status }) => {
  const styles = {
    [TASK_STATUS.PENDING]: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
    [TASK_STATUS.IN_PROGRESS]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    [TASK_STATUS.COMPLETED]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    [TASK_STATUS.CANCELLED]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
  };
  return <Badge variant="outline" className={styles[status] || ''}>{status}</Badge>;
};

export const TaskPriorityBadge = ({ priority }) => {
  const styles = {
    [TASK_PRIORITY.LOW]: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    [TASK_PRIORITY.MEDIUM]: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    [TASK_PRIORITY.HIGH]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    [TASK_PRIORITY.CRITICAL]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };
  return <Badge variant="secondary" className={`border-transparent ${styles[priority] || ''}`}>{priority}</Badge>;
};

export const TaskTypeBadge = ({ type }) => {
  if (!type) return null;
  return <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-900">{type}</Badge>;
};
