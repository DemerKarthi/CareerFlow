import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { PrimaryContactBadge, DepartmentBadge } from './RecruiterBadges';
import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { Building2, Mail, Phone, MapPin, Globe, Link as Linkedin, Briefcase } from 'lucide-react';

export const RecruiterDetailsDrawer = ({ isOpen, onClose, recruiter }) => {
  if (!recruiter) return null;

  const getInitials = (name) => {
    if (!name) return 'R';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 pr-8">
            <Avatar className="h-16 w-16 border border-slate-200 dark:border-slate-700">
              <AvatarFallback className="bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 text-xl">
                {getInitials(recruiter.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl">{recruiter.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-1 text-slate-600 dark:text-slate-400">
                {recruiter.designation && (
                  <span className="font-medium text-slate-900 dark:text-slate-200">{recruiter.designation}</span>
                )}
                {recruiter.designation && recruiter.company?.companyName && <span>•</span>}
                <span>{recruiter.company?.companyName}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-8">

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <PrimaryContactBadge isPrimary={recruiter.isPrimaryContact} />
            <DepartmentBadge department={recruiter.department} />
            {!recruiter.isPrimaryContact && !recruiter.department && (
              <span className="text-sm text-slate-400">No tags</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Contact Information</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="w-20">Email:</span>
                  {recruiter.email ? (
                    <a href={`mailto:${recruiter.email}`} className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                      {recruiter.email}
                    </a>
                  ) : (
                    <span className="font-medium text-slate-900 dark:text-slate-200">—</span>
                  )}
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="w-20">Phone:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-200">{recruiter.phone || '—'}</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Linkedin className="h-4 w-4 mr-2" />
                  <span className="w-20">LinkedIn:</span>
                  {recruiter.linkedinUrl ? (
                    <a href={recruiter.linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline truncate">
                      View Profile
                    </a>
                  ) : (
                    <span className="font-medium text-slate-900 dark:text-slate-200">—</span>
                  )}
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="w-20">Location:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-200">{recruiter.location || '—'}</span>
                </div>
              </dl>
            </div>

            {/* Company Info */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Company Information</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span className="w-20">Company:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-200">{recruiter.company?.companyName || '—'}</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span className="w-20">Industry:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-200">{recruiter.company?.industry || '—'}</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="w-20">Location:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-200">{recruiter.company?.location || '—'}</span>
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="w-20">Website:</span>
                  {recruiter.company?.website ? (
                    <a href={recruiter.company.website} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                      Visit Website
                    </a>
                  ) : (
                    <span className="font-medium text-slate-900 dark:text-slate-200">—</span>
                  )}
                </div>
              </dl>
            </div>

          </div>

          {/* Notes */}
          {recruiter.notes && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Notes</h3>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                {recruiter.notes}
              </div>
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
};
