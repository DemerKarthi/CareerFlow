import React from 'react';
import { Badge } from '../../../components/ui/badge';
import { COMPANY_STATUS, COMPANY_PRIORITY, WORK_MODE } from '../constants';

export const StatusBadge = ({ status }) => {
  let variant = 'default';
  switch (status) {
    case COMPANY_STATUS.OFFER:
    case COMPANY_STATUS.JOINED:
      variant = 'default';
      break;
    case COMPANY_STATUS.INTERESTED:
    case COMPANY_STATUS.APPLIED:
      variant = 'secondary';
      break;
    case COMPANY_STATUS.INTERVIEWING:
      variant = 'outline';
      break;
    case COMPANY_STATUS.REJECTED:
    case COMPANY_STATUS.ARCHIVED:
      variant = 'destructive';
      break;
    default:
      variant = 'secondary';
  }
  
  return <Badge variant={variant}>{status}</Badge>;
};

export const PriorityBadge = ({ priority }) => {
  let variant = 'default';
  switch (priority) {
    case COMPANY_PRIORITY.HIGH:
      variant = 'destructive';
      break;
    case COMPANY_PRIORITY.MEDIUM:
      variant = 'default';
      break;
    case COMPANY_PRIORITY.LOW:
      variant = 'secondary';
      break;
    default:
      variant = 'secondary';
  }
  
  return <Badge variant={variant}>{priority}</Badge>;
};

export const WorkModeBadge = ({ mode }) => {
  if (!mode) return null;
  return <Badge variant="outline">{mode}</Badge>;
};
