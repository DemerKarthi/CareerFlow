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
import { interviewSchema } from '../schemas';
import { INTERVIEW_TYPE, INTERVIEW_MODE, INTERVIEW_STATUS, INTERVIEW_RESULT } from '../constants';

export const InterviewForm = ({ isOpen, onClose, onSubmit, initialData, isSubmitting, applications, recruiters }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useHookForm({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      applicationId: '',
      recruiterId: '',
      roundName: '',
      roundNumber: 1,
      interviewType: '',
      mode: '',
      scheduledAt: '',
      duration: '',
      interviewerName: '',
      interviewerDesignation: '',
      meetingLink: '',
      location: '',
      status: INTERVIEW_STATUS.SCHEDULED,
      result: INTERVIEW_RESULT.PENDING,
      feedback: '',
      rating: '',
      nextRoundDate: '',
      notes: '',
    },
  });

  const selectedApplicationId = watch('applicationId');

  // Filter recruiters to show only those from the selected application's company
  const filteredRecruiters = useMemo(() => {
    if (!selectedApplicationId || !applications || !recruiters) return [];
    const selectedApp = applications.find((a) => a.id === selectedApplicationId);
    if (!selectedApp) return [];
    return recruiters.filter((r) => r.companyId === selectedApp.companyId);
  }, [selectedApplicationId, applications, recruiters]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        const formattedData = {};
        Object.keys(initialData).forEach((key) => {
          formattedData[key] = initialData[key] !== null ? initialData[key] : '';
        });
        // datetime-local format
        if (formattedData.scheduledAt) {
          formattedData.scheduledAt = new Date(formattedData.scheduledAt).toISOString().slice(0, 16);
        }
        if (formattedData.nextRoundDate) {
          formattedData.nextRoundDate = formattedData.nextRoundDate.split('T')[0];
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Interview' : 'Schedule Interview'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 mt-4">

          {/* Round Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Round Details</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Application *</label>
                <select {...register('applicationId')} className={inputClass} disabled={!!initialData}>
                  <option value="">Select Application...</option>
                  {applications?.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.jobTitle} @ {a.company?.companyName}
                    </option>
                  ))}
                </select>
                {errors.applicationId && <p className="mt-1 text-sm text-red-500">{errors.applicationId.message}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Recruiter (Optional)</label>
                <select {...register('recruiterId')} className={inputClass} disabled={!selectedApplicationId}>
                  <option value="">Select Recruiter...</option>
                  {filteredRecruiters.map((r) => (
                    <option key={r.id} value={r.id}>{r.name} — {r.designation || 'No title'}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Round Name *</label>
                <input type="text" {...register('roundName')} placeholder="e.g. Technical Round 1" className={inputClass} />
                {errors.roundName && <p className="mt-1 text-sm text-red-500">{errors.roundName.message}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Round Number *</label>
                <input type="number" {...register('roundNumber')} min="1" className={inputClass} />
                {errors.roundNumber && <p className="mt-1 text-sm text-red-500">{errors.roundNumber.message}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Interview Type *</label>
                <select {...register('interviewType')} className={inputClass}>
                  <option value="">Select Type...</option>
                  {Object.values(INTERVIEW_TYPE).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.interviewType && <p className="mt-1 text-sm text-red-500">{errors.interviewType.message}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Mode</label>
                <select {...register('mode')} className={inputClass}>
                  <option value="">Select Mode...</option>
                  {Object.values(INTERVIEW_MODE).map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Schedule</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Scheduled Date & Time *</label>
                <input type="datetime-local" {...register('scheduledAt')} className={inputClass} />
                {errors.scheduledAt && <p className="mt-1 text-sm text-red-500">{errors.scheduledAt.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Duration (minutes)</label>
                <input type="number" {...register('duration')} min="1" placeholder="60" className={inputClass} />
                {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Next Round Date</label>
                <input type="date" {...register('nextRoundDate')} className={inputClass} />
                {errors.nextRoundDate && <p className="mt-1 text-sm text-red-500">{errors.nextRoundDate.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Meeting Link</label>
                <input type="url" {...register('meetingLink')} placeholder="https://" className={inputClass} />
                {errors.meetingLink && <p className="mt-1 text-sm text-red-500">{errors.meetingLink.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
                <input type="text" {...register('location')} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Interviewer */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Interviewer</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                <input type="text" {...register('interviewerName')} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Designation</label>
                <input type="text" {...register('interviewerDesignation')} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Outcome */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Outcome</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
                <select {...register('status')} className={inputClass}>
                  {Object.values(INTERVIEW_STATUS).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Result</label>
                <select {...register('result')} className={inputClass}>
                  {Object.values(INTERVIEW_RESULT).map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Rating (1–5)</label>
                <select {...register('rating')} className={inputClass}>
                  <option value="">No Rating</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{'★'.repeat(n)} ({n})</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Feedback</label>
              <textarea {...register('feedback')} rows={3} className={inputClass} />
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
              {isSubmitting ? 'Saving...' : initialData ? 'Update Interview' : 'Schedule Interview'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
