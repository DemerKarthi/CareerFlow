import { Sequelize } from 'sequelize';
import env from './env.js';

const sequelize = new Sequelize(
  env.db.name,
  env.db.user,
  env.db.password,
  {
    host: env.db.host,
    dialect: env.db.dialect,
    logging: false, // Set to console.log to see SQL queries
  }
);

export default sequelize;
