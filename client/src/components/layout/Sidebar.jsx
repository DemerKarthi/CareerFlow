import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { NAVIGATION_ITEMS, BOTTOM_NAVIGATION_ITEMS } from '../../config/navigation';

export const Sidebar = ({ className }) => {
  const NavItem = ({ item }) => {
    const Icon = item.icon;
    return (
      <NavLink
        to={item.route}
        className={({ isActive }) =>
          cn(
            "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
            isActive
              ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-slate-50"
          )
        }
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {item.title}
      </NavLink>
    );
  };

  return (
    <div className={cn("flex h-full flex-col bg-white border-r border-slate-200 dark:bg-slate-950 dark:border-slate-800", className)}>
      <div className="flex h-16 shrink-0 items-center px-6">
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
          CareerFlow
        </span>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4 hide-scrollbar">
        <nav className="flex-1 space-y-1">
          {NAVIGATION_ITEMS.map((item) => (
            <NavItem key={item.route} item={item} />
          ))}
        </nav>
        
        <div className="mt-8 border-t border-slate-200 pt-4 dark:border-slate-800">
          <nav className="space-y-1">
            {BOTTOM_NAVIGATION_ITEMS.map((item) => (
              <NavItem key={item.route} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
