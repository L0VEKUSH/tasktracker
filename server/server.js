require('dotenv').config(); // Init env
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Task Tracker API is running' });
});

const authRoutes = require('./routes/authRoutes');

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// 404 + error handlers (order matters: keep these last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
