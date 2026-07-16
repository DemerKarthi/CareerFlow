import React from 'react';
import { cn } from "../../lib/utils";
import { FolderOpen } from 'lucide-react';

export const EmptyState = ({ 
  icon: Icon = FolderOpen, 
  title = "No data available", 
  description = "Get started by creating a new record.", 
  action,
  className 
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50",
      className
    )}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
        <Icon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        {description}
      </p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};
