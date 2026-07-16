import React from 'react';
import { useGetInterviews } from '../api/useInterviews';
import { InterviewStatusBadge, InterviewResultBadge } from './InterviewBadges';
import { Skeleton } from '../../../components/ui/skeleton';

export const InterviewTimeline = ({ applicationId, currentInterviewId }) => {
  const { data: response, isLoading } = useGetInterviews({
    applicationId,
    limit: 50,
    sortBy: 'roundNumber',
    sortOrder: 'ASC',
  });

  if (isLoading) {
    return (
      <div className="space-y-4 py-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  const interviews = response?.data || [];

  if (interviews.length === 0) {
    return <p className="text-sm text-slate-500 py-4">No interviews recorded for this application.</p>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div className="py-4">
      <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 md:ml-4 space-y-6">
        {interviews.map((intv, idx) => {
          const isCurrent = intv.id === currentInterviewId;
          const isLast = idx === interviews.length - 1;
          
          return (
            <div key={intv.id} className="relative pl-6 md:pl-8">
              {/* Timeline dot */}
              <div 
                className={`absolute left-[-9px] top-1 h-4 w-4 rounded-full border-2 bg-white dark:bg-slate-950 ${
                  isCurrent 
                    ? 'border-indigo-600 bg-indigo-100 dark:bg-indigo-900/30' 
                    : 'border-slate-300 dark:border-slate-600'
                }`}
              />
              
              <div className={`p-4 rounded-lg border ${
                isCurrent 
                  ? 'border-indigo-200 bg-indigo-50/50 dark:border-indigo-800 dark:bg-indigo-900/10' 
                  : 'border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h4 className={`text-sm font-semibold ${isCurrent ? 'text-indigo-900 dark:text-indigo-100' : 'text-slate-900 dark:text-slate-100'}`}>
                      {intv.roundName}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Round {intv.roundNumber} • {intv.interviewType} • {formatDate(intv.scheduledAt)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <InterviewStatusBadge status={intv.status} />
                    <InterviewResultBadge result={intv.result} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
