import React from 'react';
import { Badge } from '../../../components/ui/badge';
import { INTERVIEW_STATUS, INTERVIEW_RESULT } from '../constants';

export const InterviewStatusBadge = ({ status }) => {
  const styles = {
    [INTERVIEW_STATUS.SCHEDULED]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    [INTERVIEW_STATUS.COMPLETED]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    [INTERVIEW_STATUS.CANCELLED]: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
    [INTERVIEW_STATUS.RESCHEDULED]: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    [INTERVIEW_STATUS.NO_SHOW]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
  };
  return <Badge variant="outline" className={styles[status] || ''}>{status}</Badge>;
};

export const InterviewResultBadge = ({ result }) => {
  const styles = {
    [INTERVIEW_RESULT.PENDING]: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
    [INTERVIEW_RESULT.PASSED]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    [INTERVIEW_RESULT.FAILED]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
    [INTERVIEW_RESULT.ON_HOLD]: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    [INTERVIEW_RESULT.SELECTED]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
  };
  return <Badge variant="outline" className={styles[result] || ''}>{result}</Badge>;
};

export const InterviewTypeBadge = ({ type }) => {
  if (!type) return null;
  return <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-900">{type}</Badge>;
};

export const InterviewModeBadge = ({ mode }) => {
  if (!mode) return null;
  return <Badge variant="secondary" className="text-xs">{mode}</Badge>;
};
