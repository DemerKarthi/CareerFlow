import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Badge } from '../../../components/ui/badge';
import { StageBadge, StatusBadge, PriorityBadge, PlatformBadge } from './ApplicationBadges';
import { STAGE_ORDER } from '../constants';
import { Building2, MapPin, Globe, Briefcase, Calendar, DollarSign, Mail, Phone, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';

export const ApplicationDetailsDrawer = ({ isOpen, onClose, application }) => {
  if (!application) return null;

  const currentStageIndex = STAGE_ORDER.indexOf(application.currentStage);
  
  const getInitials = (name) => {
    if (!name) return 'C';
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleString();
  };

  const formatSalary = () => {
    if (application.salaryMin && application.salaryMax) {
      return `${application.currency || '$'}${application.salaryMin.toLocaleString()} - ${application.salaryMax.toLocaleString()}`;
    }
    if (application.salaryMin) {
      return `${application.currency || '$'}${application.salaryMin.toLocaleString()}`;
    }
    return '—';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start pr-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border border-slate-200 dark:border-slate-700 bg-white">
                <AvatarImage src={application.company?.logoUrl} alt={application.company?.companyName} />
                <AvatarFallback className="bg-indigo-50 text-indigo-700 text-xl">{getInitials(application.company?.companyName)}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">{application.jobTitle}</DialogTitle>
                <div className="flex items-center gap-2 mt-1 text-slate-600 dark:text-slate-400">
                  <span className="font-medium text-slate-900 dark:text-slate-200">{application.company?.companyName}</span>
                  {application.company?.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center"><MapPin className="h-3 w-3 mr-1"/> {application.company.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-8">
          
          {/* Status Bar */}
          <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <StageBadge stage={application.currentStage} />
            <StatusBadge status={application.applicationStatus} />
            <PriorityBadge priority={application.priority} />
            <PlatformBadge platform={application.platform} />
            {application.employmentType && <Badge variant="outline" className="bg-white dark:bg-slate-950">{application.employmentType}</Badge>}
          </div>

          {/* Application Pipeline */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Pipeline Progress</h3>
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-200 dark:bg-slate-700">
                <div 
                  style={{ width: `${Math.max(5, (currentStageIndex / (STAGE_ORDER.length - 1)) * 100)}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{STAGE_ORDER[0]}</span>
                <span className="font-medium text-indigo-600 dark:text-indigo-400">{application.currentStage}</span>
                <span>{STAGE_ORDER[STAGE_ORDER.length - 3]}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Details Column 1 */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Job Details</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span className="w-24">Job ID:</span>
                    <span className="font-medium text-slate-900 dark:text-slate-200">{application.jobId || '—'}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Globe className="h-4 w-4 mr-2" />
                    <span className="w-24">URL:</span>
                    {application.jobUrl ? (
                      <a href={application.jobUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline truncate">View Posting</a>
                    ) : (
                      <span className="font-medium text-slate-900 dark:text-slate-200">—</span>
                    )}
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span className="w-24">Salary:</span>
                    <span className="font-medium text-slate-900 dark:text-slate-200">{formatSalary()}</span>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Important Dates</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="w-24">Applied:</span>
                    <span className="font-medium text-slate-900 dark:text-slate-200">{formatDate(application.applicationDate)}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                    <span className="w-24">Follow-up:</span>
                    <span className="font-medium text-slate-900 dark:text-slate-200">{formatDate(application.nextFollowUp)}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                    <span className="w-24">Interview:</span>
                    <span className="font-medium text-slate-900 dark:text-slate-200">{formatDateTime(application.interviewDate)}</span>
                  </div>
                </dl>
              </div>
            </div>

            {/* Details Column 2 */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Recruiter Information</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <UserIcon className="h-4 w-4 mr-2" />
                    <span className="w-16">Name:</span>
                    <span className="font-medium text-slate-900 dark:text-slate-200">{application.recruiterName || '—'}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="w-16">Email:</span>
                    {application.recruiterEmail ? (
                      <a href={`mailto:${application.recruiterEmail}`} className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">{application.recruiterEmail}</a>
                    ) : (
                      <span className="font-medium text-slate-900 dark:text-slate-200">—</span>
                    )}
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="w-16">Phone:</span>
                    <span className="font-medium text-slate-900 dark:text-slate-200">{application.recruiterPhone || '—'}</span>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Company Information</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Building2 className="h-4 w-4 mr-2" />
                    <span className="font-medium text-slate-900 dark:text-slate-200">{application.company?.industry || '—'}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Globe className="h-4 w-4 mr-2" />
                    {application.company?.website ? (
                      <a href={application.company?.website} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Website</a>
                    ) : (
                      <span className="font-medium text-slate-900 dark:text-slate-200">—</span>
                    )}
                  </div>
                </dl>
              </div>
            </div>

          </div>

          {/* Notes */}
          {application.notes && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Notes</h3>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                {application.notes}
              </div>
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
};
