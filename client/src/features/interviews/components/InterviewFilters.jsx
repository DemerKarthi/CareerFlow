import React from 'react';
import { Search, Filter } from 'lucide-react';
import { INTERVIEW_STATUS, INTERVIEW_RESULT, INTERVIEW_TYPE, INTERVIEW_MODE } from '../constants';

export const InterviewFilters = ({ filters, onFilterChange, onSearchChange, companies }) => {
  return (
    <div className="flex flex-col space-y-4 mb-6 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        <Filter className="h-4 w-4" />
        Filters & Search
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search companies, jobs, interviewers..."
            className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3 py-2 border shadow-sm outline-none transition-colors text-slate-900 dark:text-white"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Row 1 Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:flex-1">
          <select
            className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3 py-2 border shadow-sm outline-none text-slate-900 dark:text-white"
            value={filters.status || ''}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            {Object.values(INTERVIEW_STATUS).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3 py-2 border shadow-sm outline-none text-slate-900 dark:text-white"
            value={filters.result || ''}
            onChange={(e) => onFilterChange('result', e.target.value)}
          >
            <option value="">All Results</option>
            {Object.values(INTERVIEW_RESULT).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <select
            className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3 py-2 border shadow-sm outline-none text-slate-900 dark:text-white"
            value={filters.interviewType || ''}
            onChange={(e) => onFilterChange('interviewType', e.target.value)}
          >
            <option value="">All Types</option>
            {Object.values(INTERVIEW_TYPE).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select
            className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3 py-2 border shadow-sm outline-none text-slate-900 dark:text-white"
            value={filters.companyId || ''}
            onChange={(e) => onFilterChange('companyId', e.target.value)}
          >
            <option value="">All Companies</option>
            {companies?.map((c) => (
              <option key={c.id} value={c.id}>{c.companyName}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
