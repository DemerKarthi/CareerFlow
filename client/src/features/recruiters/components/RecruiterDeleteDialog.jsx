import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';

export const RecruiterDeleteDialog = ({ isOpen, onClose, onConfirm, recruiterName, companyName, isDeleting }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Recruiter</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">"{recruiterName}"</span> from <span className="font-semibold text-slate-900 dark:text-white">"{companyName}"</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Recruiter'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
