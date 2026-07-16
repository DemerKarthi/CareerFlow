import { 
  APPLICATION_STATUS, 
  APPLICATION_STAGE, 
  APPLICATION_PRIORITY, 
  APPLICATION_PLATFORM, 
  EMPLOYMENT_TYPE 
} from '../constants/application.constants.js';

export const applicationSchema = (data) => {
  const errors = [];
  const { 
    companyId, 
    jobTitle, 
    jobUrl, 
    platform, 
    employmentType, 
    salaryMin, 
    salaryMax, 
    currentStage, 
    priority, 
    applicationStatus, 
    recruiterEmail, 
    applicationDate, 
    nextFollowUp 
  } = data;

  if (!companyId) {
    errors.push('Company ID is required');
  }

  if (!jobTitle || jobTitle.trim() === '') {
    errors.push('Job title is required');
  }

  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (jobUrl && jobUrl.trim() !== '' && !urlRegex.test(jobUrl)) {
    errors.push('Job URL must be a valid URL');
  }

  if (platform && !Object.values(APPLICATION_PLATFORM).includes(platform)) {
    errors.push('Invalid platform');
  }

  if (employmentType && !Object.values(EMPLOYMENT_TYPE).includes(employmentType)) {
    errors.push('Invalid employment type');
  }

  if (currentStage && !Object.values(APPLICATION_STAGE).includes(currentStage)) {
    errors.push('Invalid current stage');
  }

  if (priority && !Object.values(APPLICATION_PRIORITY).includes(priority)) {
    errors.push('Invalid priority');
  }

  if (applicationStatus && !Object.values(APPLICATION_STATUS).includes(applicationStatus)) {
    errors.push('Invalid application status');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (recruiterEmail && recruiterEmail.trim() !== '' && !emailRegex.test(recruiterEmail)) {
    errors.push('Recruiter email must be a valid email address');
  }

  if (salaryMin !== undefined && salaryMax !== undefined && salaryMin !== null && salaryMax !== null) {
    if (Number(salaryMin) > Number(salaryMax)) {
      errors.push('Minimum salary cannot exceed maximum salary');
    }
  }

  if (applicationDate && nextFollowUp) {
    const appDate = new Date(applicationDate);
    const followUpDate = new Date(nextFollowUp);
    
    // Simple reset time to compare just the dates if dates are provided
    if (appDate.toString() !== 'Invalid Date' && followUpDate.toString() !== 'Invalid Date') {
      if (followUpDate < appDate) {
        errors.push('Next follow-up date cannot be earlier than application date');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const stageUpdateSchema = (data) => {
  const errors = [];
  if (!data.currentStage || !Object.values(APPLICATION_STAGE).includes(data.currentStage)) {
    errors.push('Invalid current stage');
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
};
