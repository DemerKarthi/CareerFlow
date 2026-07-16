import React from 'react';
import { MoreHorizontal, Edit, Trash2, ExternalLink, Calendar, MapPin, Eye } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { StageBadge, PriorityBadge, PlatformBadge } from './ApplicationBadges';

export const ApplicationTable = ({ applications, onEdit, onDelete, onView }) => {
  const getInitials = (name) => {
    if (!name) return 'C';
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  if (!applications || applications.length === 0) {
    return null;
  }

  // Desktop Table View
  const DesktopView = () => (
    <div className="hidden md:block overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Job Title & Company</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Current Stage</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Priority</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Applied</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Next Follow-up</th>
              <th className="px-6 py-4 font-medium text-right text-slate-900 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700 bg-white">
                      <AvatarImage src={app.company?.logoUrl} alt={app.company?.companyName} />
                      <AvatarFallback className="bg-indigo-50 text-indigo-700">{getInitials(app.company?.companyName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => onView(app)}>
                        {app.jobTitle}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        {app.company?.companyName}
                        {app.jobUrl && (
                          <a href={app.jobUrl} target="_blank" rel="noopener noreferrer" className="ml-1 text-slate-400 hover:text-indigo-600" onClick={e => e.stopPropagation()}>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-start gap-1">
                    <StageBadge stage={app.currentStage} />
                    <PlatformBadge platform={app.platform} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <PriorityBadge priority={app.priority} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-slate-500 text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                    {formatDate(app.applicationDate)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-slate-500 text-sm">
                    {app.nextFollowUp ? (
                      <>
                        <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                        <span className={new Date(app.nextFollowUp) < new Date() ? 'text-red-500 font-medium' : ''}>
                          {formatDate(app.nextFollowUp)}
                        </span>
                      </>
                    ) : (
                      '—'
                    )}
                  </div>
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
                      <DropdownMenuItem onClick={() => onView(app)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(app)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(app)} className="text-red-600 focus:text-red-600">
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

  // Mobile Card View
  const MobileView = () => (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {applications.map((app) => (
        <div key={app.id} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 shadow-sm" onClick={() => onView(app)}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border border-slate-200 dark:border-slate-700">
                <AvatarImage src={app.company?.logoUrl} alt={app.company?.companyName} />
                <AvatarFallback className="bg-indigo-50 text-indigo-700">{getInitials(app.company?.companyName)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white line-clamp-1">
                  {app.jobTitle}
                </h3>
                <p className="text-sm text-slate-500">
                  {app.company?.companyName}
                </p>
              </div>
            </div>
            <div onClick={e => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView(app)}>
                    <Eye className="mr-2 h-4 w-4" /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(app)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(app)} className="text-red-600 focus:text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <StageBadge stage={app.currentStage} />
            <PriorityBadge priority={app.priority} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{formatDate(app.applicationDate)}</span>
            </div>
            {app.company?.location && (
              <div className="flex items-center gap-2 truncate">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="truncate">{app.company.location}</span>
              </div>
            )}
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
