import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { TaskStatusBadge, TaskPriorityBadge, TaskTypeBadge } from './TaskBadges';
import { Building2, Calendar, Clock, Bell, FileText, CheckCircle2 } from 'lucide-react';
import { TASK_STATUS } from '../constants';

export const TaskDetailsDrawer = ({ isOpen, onClose, task }) => {
  if (!task) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const isCompleted = task.status === TASK_STATUS.COMPLETED;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl pr-6">{task.title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
            <TaskTypeBadge type={task.taskType} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Schedule */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Schedule</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex items-start text-slate-600 dark:text-slate-400">
                  <Calendar className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-medium text-slate-900 dark:text-slate-200">{formatDate(task.dueDate)}</span>
                    <span className="text-xs text-slate-500">Due Date</span>
                  </div>
                </div>
                {task.reminderAt && (
                  <div className="flex items-start text-slate-600 dark:text-slate-400">
                    <Bell className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="block font-medium text-slate-900 dark:text-slate-200">{formatDate(task.reminderAt)}</span>
                      <span className="text-xs text-slate-500">Reminder</span>
                    </div>
                  </div>
                )}
                {isCompleted && task.completedAt && (
                  <div className="flex items-start text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="block font-medium">{formatDate(task.completedAt)}</span>
                      <span className="text-xs opacity-80">Completed On</span>
                    </div>
                  </div>
                )}
              </dl>
            </div>

            {/* Context */}
            {(task.application || task.interview) && (
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Context</h3>
                <dl className="space-y-3 text-sm">
                  {task.application && (
                    <div className="flex items-start text-slate-600 dark:text-slate-400">
                      <Building2 className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block font-medium text-slate-900 dark:text-slate-200">{task.application.company?.companyName}</span>
                        <span className="text-xs text-slate-500">{task.application.jobTitle}</span>
                      </div>
                    </div>
                  )}
                  {task.interview && (
                    <div className="flex items-start text-slate-600 dark:text-slate-400">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block font-medium text-slate-900 dark:text-slate-200">{task.interview.roundName}</span>
                        <span className="text-xs text-slate-500">Round {task.interview.roundNumber}</span>
                      </div>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>

          {/* Description & Notes */}
          {(task.description || task.notes) && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
              {task.description && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Description
                  </h3>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {task.description}
                  </div>
                </div>
              )}
              {task.notes && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">General Notes</h3>
                  <div className="p-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-900/30 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {task.notes}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
};
