import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import {
  INTERVIEW_TYPE,
  INTERVIEW_MODE,
  INTERVIEW_STATUS,
  INTERVIEW_RESULT,
} from '../constants/interview.constants.js';

const Interview = sequelize.define('Interview', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  applicationId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Applications',
      key: 'id',
    },
  },
  recruiterId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Recruiters',
      key: 'id',
    },
  },
  roundName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  roundNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  interviewType: {
    type: DataTypes.ENUM(Object.values(INTERVIEW_TYPE)),
    allowNull: false,
  },
  mode: {
    type: DataTypes.ENUM(Object.values(INTERVIEW_MODE)),
    allowNull: true,
  },
  scheduledAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: true,
  },
  interviewerName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  interviewerDesignation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  meetingLink: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(Object.values(INTERVIEW_STATUS)),
    defaultValue: INTERVIEW_STATUS.SCHEDULED,
  },
  result: {
    type: DataTypes.ENUM(Object.values(INTERVIEW_RESULT)),
    defaultValue: INTERVIEW_RESULT.PENDING,
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  },
  nextRoundDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  paranoid: true, // Soft delete
});

export default Interview;
