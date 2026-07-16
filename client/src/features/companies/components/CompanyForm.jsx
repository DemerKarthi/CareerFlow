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
import { companySchema } from '../schemas';
import { COMPANY_STATUS, COMPANY_PRIORITY, WORK_MODE, INDUSTRY_OPTIONS } from '../constants';

export const CompanyForm = ({ isOpen, onClose, onSubmit, initialData, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useHookForm({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: '',
      website: '',
      linkedinUrl: '',
      careerPage: '',
      industry: '',
      companySize: '',
      headquarters: '',
      location: '',
      workMode: '',
      status: COMPANY_STATUS.INTERESTED,
      priority: COMPANY_PRIORITY.MEDIUM,
      notes: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Form needs to be populated with existing data, handling nulls to empty strings
        const formattedData = {};
        Object.keys(initialData).forEach(key => {
          formattedData[key] = initialData[key] || '';
        });
        // Enums need specific handling if they were null
        formattedData.status = initialData.status || COMPANY_STATUS.INTERESTED;
        formattedData.priority = initialData.priority || COMPANY_PRIORITY.MEDIUM;
        formattedData.workMode = initialData.workMode || '';

        reset(formattedData);
      } else {
        reset();
      }
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = (data) => {
    // Clean up empty strings to undefined to avoid validation issues if optional
    const cleanedData = { ...data };
    Object.keys(cleanedData).forEach(key => {
      if (cleanedData[key] === '') {
        cleanedData[key] = undefined; // Or null depending on backend preference, backend is fine with undefined/null since they are optional.
      }
    });
    onSubmit(cleanedData);
  };

  const inputClass = "block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Company' : 'Add New Company'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Company Name *</label>
              <input type="text" {...register('companyName')} className={inputClass} />
              {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName.message}</p>}
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Industry</label>
              <select {...register('industry')} className={inputClass}>
                <option value="">Select Industry...</option>
                {INDUSTRY_OPTIONS.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Website</label>
              <input type="url" {...register('website')} placeholder="https://" className={inputClass} />
              {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website.message}</p>}
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">LinkedIn URL</label>
              <input type="url" {...register('linkedinUrl')} placeholder="https://" className={inputClass} />
              {errors.linkedinUrl && <p className="mt-1 text-sm text-red-500">{errors.linkedinUrl.message}</p>}
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Career Page</label>
              <input type="url" {...register('careerPage')} placeholder="https://" className={inputClass} />
              {errors.careerPage && <p className="mt-1 text-sm text-red-500">{errors.careerPage.message}</p>}
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
              <input type="text" {...register('location')} placeholder="City, State" className={inputClass} />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
              <select {...register('status')} className={inputClass}>
                {Object.values(COMPANY_STATUS).map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Priority</label>
              <select {...register('priority')} className={inputClass}>
                {Object.values(COMPANY_PRIORITY).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Work Mode</label>
              <select {...register('workMode')} className={inputClass}>
                <option value="">Select Mode...</option>
                {Object.values(WORK_MODE).map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Company Size</label>
              <input type="text" {...register('companySize')} placeholder="e.g. 100-500" className={inputClass} />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Notes</label>
              <textarea {...register('notes')} rows={3} className={inputClass} />
              {errors.notes && <p className="mt-1 text-sm text-red-500">{errors.notes.message}</p>}
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (initialData ? 'Update Company' : 'Add Company')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
