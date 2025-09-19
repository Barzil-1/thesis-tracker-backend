// index.js
const alertsRouter = require('./routes/alerts');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/alerts', alertsRouter);

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Thesis Progress Tracker API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const milestoneRoutes = require('./routes/milestones');
app.use('/milestones', milestoneRoutes);

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

