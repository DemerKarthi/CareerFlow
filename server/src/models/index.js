import User from './User.js';
import Company from './Company.js';

// Define Associations
User.hasMany(Company, {
  foreignKey: 'userId',
  as: 'companies',
  onDelete: 'CASCADE' // If user is deleted, their companies are deleted
});

Company.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export { User, Company };
