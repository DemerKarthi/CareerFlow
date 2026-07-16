import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { 
  APPLICATION_STATUS, 
  APPLICATION_STAGE, 
  APPLICATION_PRIORITY, 
  APPLICATION_PLATFORM, 
  EMPLOYMENT_TYPE 
} from '../constants/application.constants.js';

const Application = sequelize.define('Application', {
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
      key: 'id'
    }
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Companies',
      key: 'id'
    }
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  jobId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jobUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    }
  },
  platform: {
    type: DataTypes.ENUM(Object.values(APPLICATION_PLATFORM)),
    allowNull: true,
  },
  employmentType: {
    type: DataTypes.ENUM(Object.values(EMPLOYMENT_TYPE)),
    allowNull: true,
  },
  salaryMin: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  salaryMax: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  currency: {
    type: DataTypes.STRING(3), // e.g., USD, INR, EUR
    allowNull: true,
  },
  applicationDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  currentStage: {
    type: DataTypes.ENUM(Object.values(APPLICATION_STAGE)),
    defaultValue: APPLICATION_STAGE.WISHLIST,
  },
  priority: {
    type: DataTypes.ENUM(Object.values(APPLICATION_PRIORITY)),
    defaultValue: APPLICATION_PRIORITY.MEDIUM,
  },
  applicationStatus: {
    type: DataTypes.ENUM(Object.values(APPLICATION_STATUS)),
    defaultValue: APPLICATION_STATUS.ACTIVE,
  },
  recruiterName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  recruiterEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    }
  },
  recruiterPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nextFollowUp: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  interviewDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  source: {
    type: DataTypes.ENUM(Object.values(APPLICATION_PLATFORM)),
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  timestamps: true,
  paranoid: true, // Soft delete
});

export default Application;
