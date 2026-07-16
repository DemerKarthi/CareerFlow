import React from 'react';
import { Search } from 'lucide-react';
import { COMPANY_STATUS, COMPANY_PRIORITY, WORK_MODE, INDUSTRY_OPTIONS } from '../constants';

export const CompanyFilters = ({ filters, onFilterChange, onSearchChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search companies, industries, or locations..."
          className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3 py-2 border shadow-sm outline-none transition-colors"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 sm:flex-nowrap">
        <select
          className="block w-full sm:w-auto rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3 py-2 border shadow-sm outline-none"
          value={filters.status || ''}
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <option value="">All Statuses</option>
          {Object.values(COMPANY_STATUS).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          className="block w-full sm:w-auto rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3 py-2 border shadow-sm outline-none"
          value={filters.priority || ''}
          onChange={(e) => onFilterChange('priority', e.target.value)}
        >
          <option value="">All Priorities</option>
          {Object.values(COMPANY_PRIORITY).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select
          className="block w-full sm:w-auto rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 px-3 py-2 border shadow-sm outline-none"
          value={filters.workMode || ''}
          onChange={(e) => onFilterChange('workMode', e.target.value)}
        >
          <option value="">All Work Modes</option>
          {Object.values(WORK_MODE).map((mode) => (
            <option key={mode} value={mode}>{mode}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
