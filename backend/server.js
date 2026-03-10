require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Allows frontend to talk to backend
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('APPATHON 2026 Backend is Running!');
});

// ✅ API Routes (These handle everything via MongoDB now!)
app.use('/api/teams', require('./routes/teamRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// ====================================================
// Start Server (Configured perfectly for Vercel)
// ====================================================
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel Serverless
module.exports = app;