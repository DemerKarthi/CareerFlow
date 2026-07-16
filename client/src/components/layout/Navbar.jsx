import React from 'react';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { ProfileDropdown } from './ProfileDropdown';

export const Navbar = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 sm:px-6">
      <button
        onClick={onMenuClick}
        className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 items-center justify-end gap-4">
        <ThemeToggle />
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />
        <ProfileDropdown />
      </div>
    </header>
  );
};
