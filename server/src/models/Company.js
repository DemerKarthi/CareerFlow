import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { COMPANY_STATUS, COMPANY_PRIORITY, WORK_MODE } from '../constants/company.constants.js';

const Company = sequelize.define('Company', {
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
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    }
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    }
  },
  linkedinUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    }
  },
  careerPage: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    }
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  companySize: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  headquarters: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  workMode: {
    type: DataTypes.ENUM(Object.values(WORK_MODE)),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(Object.values(COMPANY_STATUS)),
    defaultValue: COMPANY_STATUS.INTERESTED,
  },
  priority: {
    type: DataTypes.ENUM(Object.values(COMPANY_PRIORITY)),
    defaultValue: COMPANY_PRIORITY.MEDIUM,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  timestamps: true,
  paranoid: true, // Soft delete
});

export default Company;
