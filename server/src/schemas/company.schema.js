import { COMPANY_STATUS, COMPANY_PRIORITY, WORK_MODE } from '../constants/company.constants.js';

export const companySchema = (data) => {
  const errors = [];
  const { companyName, website, linkedinUrl, careerPage, status, priority, workMode } = data;

  if (!companyName || companyName.trim() === '') {
    errors.push('Company name is required');
  }

  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  if (website && website.trim() !== '' && !urlRegex.test(website)) {
    errors.push('Website must be a valid URL');
  }

  if (linkedinUrl && linkedinUrl.trim() !== '' && !urlRegex.test(linkedinUrl)) {
    errors.push('LinkedIn URL must be a valid URL');
  }

  if (careerPage && careerPage.trim() !== '' && !urlRegex.test(careerPage)) {
    errors.push('Career page must be a valid URL');
  }

  if (status && !Object.values(COMPANY_STATUS).includes(status)) {
    errors.push('Invalid company status');
  }

  if (priority && !Object.values(COMPANY_PRIORITY).includes(priority)) {
    errors.push('Invalid priority level');
  }

  if (workMode && !Object.values(WORK_MODE).includes(workMode)) {
    errors.push('Invalid work mode');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
