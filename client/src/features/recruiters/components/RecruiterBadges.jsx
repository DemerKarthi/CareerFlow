import React from 'react';
import { Badge } from '../../../components/ui/badge';

export const PrimaryContactBadge = ({ isPrimary }) => {
  if (!isPrimary) return null;
  return (
    <Badge variant="default" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
      Primary
    </Badge>
  );
};

export const DepartmentBadge = ({ department }) => {
  if (!department) return null;
  return (
    <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-900">
      {department}
    </Badge>
  );
};
