import dotenv from 'dotenv';
import app from './src/app.js';
import { connectDB } from './src/db.js';
import db from './src/models/index.js';

// Load environment variables first
dotenv.config({ path: '.env' });

connectDB()
.then(() => {
  const PORT = process.env.PORT || 5050;
  
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('❌ Failed to start the server:', error.message);
  process.exit(1);  
});

/*db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database synced');
    const PORT = process.env.PORT || 5050;


    // Start the server only after sync
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to sync DB:', err);
  });*/
