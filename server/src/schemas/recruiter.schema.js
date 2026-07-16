export const recruiterSchema = (data) => {
  const errors = [];
  const { companyId, name, email, linkedinUrl } = data;

  if (!companyId) {
    errors.push('Company is required');
  }

  if (!name || name.trim() === '') {
    errors.push('Recruiter name is required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && email.trim() !== '' && !emailRegex.test(email)) {
    errors.push('Email must be a valid email address');
  }

  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (linkedinUrl && linkedinUrl.trim() !== '' && !urlRegex.test(linkedinUrl)) {
    errors.push('LinkedIn URL must be a valid URL');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
