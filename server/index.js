import app from './src/app.js';
import sequelize from './src/config/database.js';
import env from './src/config/env.js';

const PORT = env.port;

// Sync Database and start server
sequelize.sync({ alter: true }) // use { force: true } to drop and recreate tables
  .then(() => {
    console.log('Database connected and synced');
    app.listen(PORT, () => {
      console.log(`Server running in ${env.nodeEnv} mode on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });
