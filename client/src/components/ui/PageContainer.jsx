import React from 'react';
import { cn } from "../../lib/utils";

export const PageContainer = ({ children, className }) => {
  return (
    <div className={cn("p-4 md:p-8 max-w-7xl mx-auto w-full flex-1 space-y-6", className)}>
      {children}
    </div>
  );
};
