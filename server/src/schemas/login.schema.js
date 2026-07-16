export const loginSchema = (data) => {
  const errors = [];
  const { email, password } = data;

  if (!email || email.trim() === '') {
    errors.push('Email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
