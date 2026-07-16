import React from 'react';
import { MoreHorizontal, Edit, Trash2, Eye, Calendar, Clock, Video } from 'lucide-react';
import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { InterviewStatusBadge, InterviewResultBadge, InterviewTypeBadge, InterviewModeBadge } from './InterviewBadges';

export const InterviewTable = ({ interviews, onEdit, onDelete, onView }) => {
  const getInitials = (name) => {
    if (!name) return 'C';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  if (!interviews || interviews.length === 0) return null;

  const DesktopView = () => (
    <div className="hidden md:block overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Company & Job</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Round</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Schedule</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Status</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Result</th>
              <th className="px-6 py-4 font-medium text-right text-slate-900 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {interviews.map((intv) => (
              <tr key={intv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                      <AvatarFallback className="bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                        {getInitials(intv.application?.company?.companyName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div
                        className="font-medium text-slate-900 dark:text-white cursor-pointer hover:text-indigo-600 transition-colors"
                        onClick={() => onView(intv)}
                      >
                        {intv.application?.company?.companyName || '—'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {intv.application?.jobTitle || '—'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900 dark:text-slate-200">{intv.roundName}</div>
                  <div className="flex gap-1 mt-1">
                    <InterviewTypeBadge type={intv.interviewType} />
                    <InterviewModeBadge mode={intv.mode} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 flex-shrink-0" /> {formatDate(intv.scheduledAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 flex-shrink-0" /> {formatTime(intv.scheduledAt)}
                      {intv.duration && <span className="text-xs text-slate-400 ml-1">({intv.duration}m)</span>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <InterviewStatusBadge status={intv.status} />
                </td>
                <td className="px-6 py-4">
                  <InterviewResultBadge result={intv.result} />
                </td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(intv)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(intv)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(intv)} className="text-red-600 focus:text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const MobileView = () => (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {interviews.map((intv) => (
        <div
          key={intv.id}
          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 shadow-sm"
          onClick={() => onView(intv)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border border-slate-200 dark:border-slate-700">
                <AvatarFallback className="bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                  {getInitials(intv.application?.company?.companyName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">{intv.application?.company?.companyName}</h3>
                <p className="text-sm text-slate-500">{intv.application?.jobTitle}</p>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">{intv.roundName}</p>
              </div>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView(intv)}>
                    <Eye className="mr-2 h-4 w-4" /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(intv)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(intv)} className="text-red-600 focus:text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <InterviewStatusBadge status={intv.status} />
            <InterviewResultBadge result={intv.result} />
            <InterviewTypeBadge type={intv.interviewType} />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5 truncate">
              <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{formatDate(intv.scheduledAt)}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Clock className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{formatTime(intv.scheduledAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <DesktopView />
      <MobileView />
    </>
  );
};
