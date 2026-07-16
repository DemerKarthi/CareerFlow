import React, { useEffect, useMemo } from 'react';
import { useForm as useHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { taskSchema } from '../schemas';
import { TASK_TYPE, TASK_PRIORITY, TASK_STATUS } from '../constants';

export const TaskForm = ({ isOpen, onClose, onSubmit, initialData, isSubmitting, applications, interviews }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useHookForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      taskType: TASK_TYPE.FOLLOW_UP,
      priority: TASK_PRIORITY.MEDIUM,
      status: TASK_STATUS.PENDING,
      applicationId: '',
      interviewId: '',
      dueDate: '',
      reminderAt: '',
      notes: '',
    },
  });

  const selectedApplicationId = watch('applicationId');

  // Filter interviews by the selected application
  const filteredInterviews = useMemo(() => {
    if (!selectedApplicationId || !interviews) return [];
    return interviews.filter((i) => i.applicationId === selectedApplicationId);
  }, [selectedApplicationId, interviews]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        const formattedData = {};
        Object.keys(initialData).forEach((key) => {
          formattedData[key] = initialData[key] !== null ? initialData[key] : '';
        });
        if (formattedData.dueDate) {
          formattedData.dueDate = new Date(formattedData.dueDate).toISOString().slice(0, 16);
        }
        if (formattedData.reminderAt) {
          formattedData.reminderAt = new Date(formattedData.reminderAt).toISOString().slice(0, 16);
        }
        reset(formattedData);
      } else {
        reset();
      }
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = (data) => {
    const cleanedData = { ...data };
    Object.keys(cleanedData).forEach((key) => {
      if (cleanedData[key] === '') {
        cleanedData[key] = null;
      }
    });
    onSubmit(cleanedData);
  };

  const inputClass =
    'block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Task' : 'Add Task'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 mt-4">

          {/* Context Linking */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Context Link (Optional)</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Application</label>
                <select {...register('applicationId')} className={inputClass} disabled={!!initialData}>
                  <option value="">No Application</option>
                  {applications?.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.jobTitle} @ {a.company?.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Interview</label>
                <select {...register('interviewId')} className={inputClass} disabled={!selectedApplicationId || !!initialData}>
                  <option value="">No Interview</option>
                  {filteredInterviews.map((i) => (
                    <option key={i.id} value={i.id}>
                      Round {i.roundNumber} — {i.roundName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Task Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title *</label>
              <input type="text" {...register('title')} placeholder="e.g. Prepare presentation" className={inputClass} />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Type *</label>
                <select {...register('taskType')} className={inputClass}>
                  {Object.values(TASK_TYPE).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.taskType && <p className="mt-1 text-sm text-red-500">{errors.taskType.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Priority *</label>
                <select {...register('priority')} className={inputClass}>
                  {Object.values(TASK_PRIORITY).map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status *</label>
                <select {...register('status')} className={inputClass}>
                  {Object.values(TASK_STATUS).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
              <textarea {...register('description')} rows={2} className={inputClass} />
            </div>
          </div>

          {/* Scheduling */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Schedule</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Due Date & Time *</label>
                <input type="datetime-local" {...register('dueDate')} className={inputClass} />
                {errors.dueDate && <p className="mt-1 text-sm text-red-500">{errors.dueDate.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Reminder Date & Time</label>
                <input type="datetime-local" {...register('reminderAt')} className={inputClass} />
                {errors.reminderAt && <p className="mt-1 text-sm text-red-500">{errors.reminderAt.message}</p>}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Notes</label>
            <textarea {...register('notes')} rows={2} className={inputClass} />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
