import React from 'react';
import { Badge } from '../../../components/ui/badge';
import { 
  APPLICATION_STATUS, 
  APPLICATION_STAGE, 
  APPLICATION_PRIORITY,
  APPLICATION_PLATFORM
} from '../constants';

export const StatusBadge = ({ status }) => {
  let variant = 'default';
  switch (status) {
    case APPLICATION_STATUS.ACTIVE:
      variant = 'default';
      break;
    case APPLICATION_STATUS.CLOSED:
      variant = 'secondary';
      break;
    case APPLICATION_STATUS.ARCHIVED:
      variant = 'destructive';
      break;
    default:
      variant = 'secondary';
  }
  return <Badge variant={variant}>{status}</Badge>;
};

export const StageBadge = ({ stage }) => {
  let variant = 'outline';
  switch (stage) {
    case APPLICATION_STAGE.WISHLIST:
    case APPLICATION_STAGE.APPLIED:
      variant = 'secondary';
      break;
    case APPLICATION_STAGE.HR_CONTACTED:
    case APPLICATION_STAGE.ASSESSMENT:
    case APPLICATION_STAGE.TECHNICAL_ROUND_1:
    case APPLICATION_STAGE.TECHNICAL_ROUND_2:
    case APPLICATION_STAGE.MANAGER_ROUND:
    case APPLICATION_STAGE.HR_ROUND:
      variant = 'outline';
      break;
    case APPLICATION_STAGE.OFFER:
    case APPLICATION_STAGE.JOINED:
      variant = 'default';
      break;
    case APPLICATION_STAGE.REJECTED:
      variant = 'destructive';
      break;
    default:
      variant = 'secondary';
  }
  return <Badge variant={variant}>{stage}</Badge>;
};

export const PriorityBadge = ({ priority }) => {
  let variant = 'default';
  switch (priority) {
    case APPLICATION_PRIORITY.HIGH:
      variant = 'destructive';
      break;
    case APPLICATION_PRIORITY.MEDIUM:
      variant = 'default';
      break;
    case APPLICATION_PRIORITY.LOW:
      variant = 'secondary';
      break;
    default:
      variant = 'secondary';
  }
  return <Badge variant={variant}>{priority}</Badge>;
};

export const PlatformBadge = ({ platform }) => {
  if (!platform) return null;
  return <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-900">{platform}</Badge>;
};
