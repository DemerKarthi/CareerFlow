import User from './User.js';
import Company from './Company.js';
import Application from './Application.js';
import Recruiter from './Recruiter.js';

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
  onDelete: 'RESTRICT' // Prevent deleting a company if it has applications, or CASCADE based on logic. Wait, let's use CASCADE so if a company is deleted, its apps are also logically soft-deleted. Or we can just let Sequelize handle it. Usually, deleting a company should cascade delete apps or restrict. Since it's paranoid, cascade soft-delete is fine. Let's use CASCADE.
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

export { User, Company, Application, Recruiter };

