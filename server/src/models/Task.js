import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { TASK_TYPE, TASK_PRIORITY, TASK_STATUS } from '../constants/task.constants.js';

const Task = sequelize.define('Task', {
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
    allowNull: true,
    references: {
      model: 'Applications',
      key: 'id',
    },
  },
  interviewId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Interviews',
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  taskType: {
    type: DataTypes.ENUM(Object.values(TASK_TYPE)),
    allowNull: false,
    defaultValue: TASK_TYPE.CUSTOM,
  },
  priority: {
    type: DataTypes.ENUM(Object.values(TASK_PRIORITY)),
    allowNull: false,
    defaultValue: TASK_PRIORITY.MEDIUM,
  },
  status: {
    type: DataTypes.ENUM(Object.values(TASK_STATUS)),
    allowNull: false,
    defaultValue: TASK_STATUS.PENDING,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true, // While form requires it, DB can theoretically be nullable. Let's make it required as per plan: "Validates required fields: title, taskType, priority, dueDate".
  },
  reminderAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  completedAt: {
    type: DataTypes.DATE,
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

export default Task;
