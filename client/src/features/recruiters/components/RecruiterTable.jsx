import React from 'react';
import { MoreHorizontal, Edit, Trash2, Eye, Mail, Phone, MapPin, ExternalLink, Link as Linkedin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { PrimaryContactBadge, DepartmentBadge } from './RecruiterBadges';

export const RecruiterTable = ({ recruiters, onEdit, onDelete, onView }) => {
  const getInitials = (name) => {
    if (!name) return 'R';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  if (!recruiters || recruiters.length === 0) return null;

  // Desktop Table
  const DesktopView = () => (
    <div className="hidden md:block overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Name & Company</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Designation</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Contact</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Department</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Status</th>
              <th className="px-6 py-4 font-medium text-right text-slate-900 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {recruiters.map((rec) => (
              <tr key={rec.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                      <AvatarFallback className="bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                        {getInitials(rec.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div
                        className="font-medium text-slate-900 dark:text-white cursor-pointer hover:text-indigo-600 transition-colors"
                        onClick={() => onView(rec)}
                      >
                        {rec.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {rec.company?.companyName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                  {rec.designation || '—'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-400">
                    {rec.email && (
                      <a href={`mailto:${rec.email}`} className="flex items-center gap-1 hover:text-indigo-600 transition-colors truncate max-w-[200px]">
                        <Mail className="h-3 w-3 flex-shrink-0" /> {rec.email}
                      </a>
                    )}
                    {rec.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3 flex-shrink-0" /> {rec.phone}
                      </span>
                    )}
                    {!rec.email && !rec.phone && '—'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <DepartmentBadge department={rec.department} />
                  {!rec.department && '—'}
                </td>
                <td className="px-6 py-4">
                  <PrimaryContactBadge isPrimary={rec.isPrimaryContact} />
                  {!rec.isPrimaryContact && (
                    <span className="text-xs text-slate-400">—</span>
                  )}
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
                      <DropdownMenuItem onClick={() => onView(rec)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(rec)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(rec)} className="text-red-600 focus:text-red-600">
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
      {recruiters.map((rec) => (
        <div
          key={rec.id}
          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 shadow-sm"
          onClick={() => onView(rec)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border border-slate-200 dark:border-slate-700">
                <AvatarFallback className="bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                  {getInitials(rec.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">{rec.name}</h3>
                <p className="text-sm text-slate-500">{rec.company?.companyName}</p>
                {rec.designation && (
                  <p className="text-xs text-slate-400 mt-0.5">{rec.designation}</p>
                )}
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
                  <DropdownMenuItem onClick={() => onView(rec)}>
                    <Eye className="mr-2 h-4 w-4" /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(rec)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(rec)} className="text-red-600 focus:text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <PrimaryContactBadge isPrimary={rec.isPrimaryContact} />
            <DepartmentBadge department={rec.department} />
          </div>

          <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
            {rec.email && (
              <div className="flex items-center gap-2 truncate">
                <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <span className="truncate">{rec.email}</span>
              </div>
            )}
            {rec.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <span>{rec.phone}</span>
              </div>
            )}
            {rec.location && (
              <div className="flex items-center gap-2 truncate">
                <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <span className="truncate">{rec.location}</span>
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
