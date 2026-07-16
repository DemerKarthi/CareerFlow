import React, { useEffect } from 'react';
import { useForm as useHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { applicationSchema } from '../schemas';
import {
  APPLICATION_STATUS,
  APPLICATION_STAGE,
  APPLICATION_PRIORITY,
  APPLICATION_PLATFORM,
  EMPLOYMENT_TYPE
} from '../constants';

export const ApplicationForm = ({ isOpen, onClose, onSubmit, initialData, isSubmitting, companies }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useHookForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      companyId: '',
      jobTitle: '',
      jobId: '',
      jobUrl: '',
      platform: '',
      employmentType: '',
      salaryMin: '',
      salaryMax: '',
      currency: 'USD',
      applicationDate: new Date().toISOString().split('T')[0],
      currentStage: APPLICATION_STAGE.WISHLIST,
      priority: APPLICATION_PRIORITY.MEDIUM,
      applicationStatus: APPLICATION_STATUS.ACTIVE,
      recruiterName: '',
      recruiterEmail: '',
      recruiterPhone: '',
      nextFollowUp: '',
      interviewDate: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        console.log("Initial Data: ", initialData);
        const formattedData = {};
        Object.keys(initialData).forEach(key => {
          formattedData[key] = initialData[key] !== null ? initialData[key] : '';
        });
        if (initialData.platform) {
          formattedData.source = initialData.platform;
        }


        // Date formatting for inputs (YYYY-MM-DD)
        if (formattedData.applicationDate) {
          formattedData.applicationDate = formattedData.applicationDate.split('T')[0];
        }
        if (formattedData.nextFollowUp) {
          formattedData.nextFollowUp = formattedData.nextFollowUp.split('T')[0];
        }
        if (formattedData.interviewDate) {
          // datetime-local requires YYYY-MM-DDThh:mm
          formattedData.interviewDate = new Date(formattedData.interviewDate).toISOString().slice(0, 16);
        }

        reset(formattedData);
      } else {
        reset();
      }
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = (data) => {
    console.log("HandleFormSubmit: ", data);
    const cleanedData = { ...data };
    Object.keys(cleanedData).forEach(key => {
      if (key === 'source') {
        cleanedData[key] = cleanedData['platform'] || null;
      }
      if (cleanedData[key] === '') {
        cleanedData[key] = null;
      }
    });
    onSubmit(cleanedData);
  };
  console.log("form errors: ", errors)
  const inputClass = "block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Application' : 'New Application'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 mt-4">

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Job Details</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Company *</label>
                <select {...register('companyId')} className={inputClass} disabled={!!initialData}>
                  <option value="">Select a Company...</option>
                  {companies?.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                </select>
                {errors.companyId && <p className="mt-1 text-sm text-red-500">{errors.companyId.message}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Job Title *</label>
                <input type="text" {...register('jobTitle')} className={inputClass} />
                {errors.jobTitle && <p className="mt-1 text-sm text-red-500">{errors.jobTitle.message}</p>}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Job URL</label>
                <input type="url" {...register('jobUrl')} placeholder="https://" className={inputClass} />
                {errors.jobUrl && <p className="mt-1 text-sm text-red-500">{errors.jobUrl.message}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Platform / Source</label>
                <select {...register('platform')} className={inputClass}>
                  <option value="">Select Platform...</option>
                  {Object.values(APPLICATION_PLATFORM).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Employment Type</label>
                <select {...register('employmentType')} className={inputClass}>
                  <option value="">Select Type...</option>
                  {Object.values(EMPLOYMENT_TYPE).map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Status & Pipeline</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Current Stage</label>
                <select {...register('currentStage')} className={inputClass}>
                  {Object.values(APPLICATION_STAGE).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Application Status</label>
                <select {...register('applicationStatus')} className={inputClass}>
                  {Object.values(APPLICATION_STATUS).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Priority</label>
                <select {...register('priority')} className={inputClass}>
                  {Object.values(APPLICATION_PRIORITY).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Timeline</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Application Date</label>
                <input type="date" {...register('applicationDate')} className={inputClass} />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Next Follow-up</label>
                <input type="date" {...register('nextFollowUp')} className={inputClass} />
                {errors.nextFollowUp && <p className="mt-1 text-sm text-red-500">{errors.nextFollowUp.message}</p>}
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Interview Date</label>
                <input type="datetime-local" {...register('interviewDate')} className={inputClass} />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Salary Expectations</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Currency</label>
                <input type="text" {...register('currency')} placeholder="USD" className={inputClass} />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Minimum</label>
                <input type="number" {...register('salaryMin')} placeholder="e.g. 100000" className={inputClass} />
                {errors.salaryMin && <p className="mt-1 text-sm text-red-500">{errors.salaryMin.message}</p>}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Maximum</label>
                <input type="number" {...register('salaryMax')} placeholder="e.g. 150000" className={inputClass} />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Recruiter Info</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                <input type="text" {...register('recruiterName')} className={inputClass} />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input type="email" {...register('recruiterEmail')} className={inputClass} />
                {errors.recruiterEmail && <p className="mt-1 text-sm text-red-500">{errors.recruiterEmail.message}</p>}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                <input type="tel" {...register('recruiterPhone')} className={inputClass} />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Notes</label>
            <textarea {...register('notes')} rows={3} className={inputClass} />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || (companies && companies.length === 0)}>
              {isSubmitting ? 'Saving...' : (initialData ? 'Update Application' : 'Save Application')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
