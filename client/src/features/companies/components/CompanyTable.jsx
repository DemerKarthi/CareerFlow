import React from 'react';
import { Building2, MapPin, Briefcase, MoreHorizontal, Edit, Trash2, Link as LinkIcon, Handshake as Linkedin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { StatusBadge, PriorityBadge, WorkModeBadge } from './CompanyBadges';

export const CompanyTable = ({ companies, onEdit, onDelete }) => {
  const getInitials = (name) => {
    return name.substring(0, 2).toUpperCase();
  };

  if (!companies || companies.length === 0) {
    return null;
  }

  // Desktop Table View
  const DesktopView = () => (
    <div className="hidden md:block overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Company</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Industry & Location</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Priority</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Status</th>
              <th className="px-6 py-4 font-medium text-right text-slate-900 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700 bg-white">
                      <AvatarImage src={company.logoUrl} alt={company.companyName} />
                      <AvatarFallback className="bg-indigo-50 text-indigo-700">{getInitials(company.companyName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                        {company.companyName}
                        {company.website && (
                          <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600">
                            <LinkIcon className="h-3 w-3" />
                          </a>
                        )}
                        {company.linkedinUrl && (
                          <a href={company.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600">
                            <Linkedin className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      {company.website && <span className="text-xs text-slate-500">{new URL(company.website).hostname.replace('www.', '')}</span>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-slate-700 dark:text-slate-300">
                      <Building2 className="mr-2 h-3.5 w-3.5 text-slate-400" />
                      {company.industry || '—'}
                    </div>
                    <div className="flex items-center text-slate-500 text-xs">
                      <MapPin className="mr-2 h-3.5 w-3.5" />
                      {company.location || '—'}
                      {company.workMode && <span className="ml-2">• {company.workMode}</span>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <PriorityBadge priority={company.priority} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={company.status} />
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
                      <DropdownMenuItem onClick={() => onEdit(company)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(company)} className="text-red-600 focus:text-red-600">
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
      {companies.map((company) => (
        <div key={company.id} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border border-slate-200 dark:border-slate-700">
                <AvatarImage src={company.logoUrl} alt={company.companyName} />
                <AvatarFallback className="bg-indigo-50 text-indigo-700">{getInitials(company.companyName)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                  {company.companyName}
                </h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  <StatusBadge status={company.status} />
                  <PriorityBadge priority={company.priority} />
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(company)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(company)} className="text-red-600 focus:text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-slate-400" />
              <span className="truncate">{company.industry || '—'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span className="truncate">{company.location || '—'}</span>
            </div>
            {company.workMode && (
              <div className="flex items-center gap-2 col-span-2">
                <Briefcase className="h-4 w-4 text-slate-400" />
                <span>{company.workMode}</span>
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
