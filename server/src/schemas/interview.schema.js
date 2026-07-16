import {
  INTERVIEW_TYPE,
  INTERVIEW_MODE,
  INTERVIEW_STATUS,
  INTERVIEW_RESULT,
} from '../constants/interview.constants.js';

export const interviewSchema = (data) => {
  const errors = [];
  const {
    applicationId,
    roundName,
    roundNumber,
    interviewType,
    mode,
    scheduledAt,
    duration,
    meetingLink,
    rating,
    nextRoundDate,
    status,
    result,
  } = data;

  if (!applicationId) {
    errors.push('Application is required');
  }

  if (!roundName || roundName.trim() === '') {
    errors.push('Round name is required');
  }

  if (!roundNumber || roundNumber < 1) {
    errors.push('Round number must be at least 1');
  }

  if (!interviewType || !Object.values(INTERVIEW_TYPE).includes(interviewType)) {
    errors.push('Valid interview type is required');
  }

  if (mode && !Object.values(INTERVIEW_MODE).includes(mode)) {
    errors.push('Invalid interview mode');
  }

  if (!scheduledAt) {
    errors.push('Scheduled date is required');
  } else if (isNaN(new Date(scheduledAt).getTime())) {
    errors.push('Scheduled date must be a valid date');
  }

  if (duration !== undefined && duration !== null && duration !== '') {
    if (Number(duration) <= 0) {
      errors.push('Duration must be greater than zero');
    }
  }

  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (meetingLink && meetingLink.trim() !== '' && !urlRegex.test(meetingLink)) {
    errors.push('Meeting link must be a valid URL');
  }

  if (rating !== undefined && rating !== null && rating !== '') {
    const r = Number(rating);
    if (!Number.isInteger(r) || r < 1 || r > 5) {
      errors.push('Rating must be an integer between 1 and 5');
    }
  }

  if (status && !Object.values(INTERVIEW_STATUS).includes(status)) {
    errors.push('Invalid interview status');
  }

  if (result && !Object.values(INTERVIEW_RESULT).includes(result)) {
    errors.push('Invalid interview result');
  }

  if (scheduledAt && nextRoundDate) {
    const scheduled = new Date(scheduledAt);
    const nextRound = new Date(nextRoundDate);
    if (scheduled.toString() !== 'Invalid Date' && nextRound.toString() !== 'Invalid Date') {
      if (nextRound < scheduled) {
        errors.push('Next round date cannot be earlier than scheduled date');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const interviewStatusSchema = (data) => {
  const errors = [];

  if (data.status && !Object.values(INTERVIEW_STATUS).includes(data.status)) {
    errors.push('Invalid interview status');
  }

  if (data.result && !Object.values(INTERVIEW_RESULT).includes(data.result)) {
    errors.push('Invalid interview result');
  }

  if (!data.status && !data.result) {
    errors.push('Status or result is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
