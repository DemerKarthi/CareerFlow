import User from './User.js';
import Company from './Company.js';
import Application from './Application.js';
import Recruiter from './Recruiter.js';
import Interview from './Interview.js';
import Task from './Task.js';

// Define Associations
User.hasMany(Company, {
  foreignKey: 'userId',
  as: 'companies',
  onDelete: 'CASCADE'
});

Company.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// Application Associations
User.hasMany(Application, {
  foreignKey: 'userId',
  as: 'applications',
  onDelete: 'CASCADE'
});

Application.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Company.hasMany(Application, {
  foreignKey: 'companyId',
  as: 'applications',
  onDelete: 'CASCADE',
});

Application.belongsTo(Company, {
  foreignKey: 'companyId',
  as: 'company',
});

// Recruiter Associations
User.hasMany(Recruiter, {
  foreignKey: 'userId',
  as: 'recruiters',
  onDelete: 'CASCADE',
});

Recruiter.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Company.hasMany(Recruiter, {
  foreignKey: 'companyId',
  as: 'recruiters',
  onDelete: 'CASCADE',
});

Recruiter.belongsTo(Company, {
  foreignKey: 'companyId',
  as: 'company',
});

// Interview Associations
User.hasMany(Interview, {
  foreignKey: 'userId',
  as: 'interviews',
  onDelete: 'CASCADE',
});

Interview.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Application.hasMany(Interview, {
  foreignKey: 'applicationId',
  as: 'interviews',
  onDelete: 'CASCADE',
});

Interview.belongsTo(Application, {
  foreignKey: 'applicationId',
  as: 'application',
});

Recruiter.hasMany(Interview, {
  foreignKey: 'recruiterId',
  as: 'interviews',
  onDelete: 'SET NULL',
});

Interview.belongsTo(Recruiter, {
  foreignKey: 'recruiterId',
  as: 'recruiter',
});

// Task Associations
User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'tasks',
  onDelete: 'CASCADE',
});

Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Application.hasMany(Task, {
  foreignKey: 'applicationId',
  as: 'tasks',
  onDelete: 'CASCADE',
});

Task.belongsTo(Application, {
  foreignKey: 'applicationId',
  as: 'application',
});

Interview.hasMany(Task, {
  foreignKey: 'interviewId',
  as: 'tasks',
  onDelete: 'CASCADE',
});

Task.belongsTo(Interview, {
  foreignKey: 'interviewId',
  as: 'interview',
});

export { User, Company, Application, Recruiter, Interview, Task };



