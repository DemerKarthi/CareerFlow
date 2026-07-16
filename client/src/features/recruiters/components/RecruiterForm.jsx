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
import { recruiterSchema } from '../schemas';
import { DEPARTMENT_SUGGESTIONS } from '../constants';

export const RecruiterForm = ({ isOpen, onClose, onSubmit, initialData, isSubmitting, companies }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useHookForm({
    resolver: zodResolver(recruiterSchema),
    defaultValues: {
      companyId: '',
      name: '',
      designation: '',
      email: '',
      phone: '',
      linkedinUrl: '',
      department: '',
      location: '',
      notes: '',
      isPrimaryContact: false,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        const formattedData = {};
        Object.keys(initialData).forEach((key) => {
          if (key === 'isPrimaryContact') {
            formattedData[key] = initialData[key] ?? false;
          } else {
            formattedData[key] = initialData[key] !== null ? initialData[key] : '';
          }
        });
        reset(formattedData);
      } else {
        reset();
      }
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = (data) => {
    const cleanedData = { ...data };
    Object.keys(cleanedData).forEach((key) => {
      if (key === 'isPrimaryContact') return; // Don't null-ify boolean
      if (cleanedData[key] === '') {
        cleanedData[key] = null;
      }
    });
    onSubmit(cleanedData);
  };

  const isPrimary = watch('isPrimaryContact');

  const inputClass =
    'block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Recruiter' : 'Add Recruiter'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 mt-4">

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Contact Details</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Company *</label>
                <select {...register('companyId')} className={inputClass} disabled={!!initialData}>
                  <option value="">Select a Company...</option>
                  {companies?.map((c) => (
                    <option key={c.id} value={c.id}>{c.companyName}</option>
                  ))}
                </select>
                {errors.companyId && <p className="mt-1 text-sm text-red-500">{errors.companyId.message}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name *</label>
                <input type="text" {...register('name')} className={inputClass} />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Designation</label>
                <input type="text" {...register('designation')} placeholder="e.g. Senior Recruiter" className={inputClass} />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Department</label>
                <select {...register('department')} className={inputClass}>
                  <option value="">Select Department...</option>
                  {DEPARTMENT_SUGGESTIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input type="email" {...register('email')} className={inputClass} />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                <input type="tel" {...register('phone')} className={inputClass} />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">LinkedIn URL</label>
                <input type="url" {...register('linkedinUrl')} placeholder="https://linkedin.com/in/..." className={inputClass} />
                {errors.linkedinUrl && <p className="mt-1 text-sm text-red-500">{errors.linkedinUrl.message}</p>}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
                <input type="text" {...register('location')} className={inputClass} />
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-end">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register('isPrimaryContact')}
                    className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Primary Contact
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Notes</label>
            <textarea {...register('notes')} rows={3} className={inputClass} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || (companies && companies.length === 0)}>
              {isSubmitting ? 'Saving...' : initialData ? 'Update Recruiter' : 'Add Recruiter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
