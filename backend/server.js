require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('APPATHON 2026 Backend is Running!');
});

// ====================================================
// LIVE HACKATHON STATE (In-Memory for real-time updates)
// ====================================================
let hackathonStatus = {
  problemStatementRevealed: false
};

// 1. Route for Admin to click "Reveal"
app.post('/api/admin/reveal', (req, res) => {
  hackathonStatus.problemStatementRevealed = true;
  console.log("🚀 ADMIN ACTION: Problem Statements Revealed to all teams!");
  res.json({ success: true, message: "Statements are now live!" });
});

// 2. Route for Team Dashboards to constantly check the status
app.get('/api/admin/status', (req, res) => {
  res.json(hackathonStatus);
});
// ====================================================

// ✅ API Routes
app.use('/api/teams', require('./routes/teamRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// ====================================================
// Start Server (Modified for Vercel)
// ====================================================
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel Serverless
module.exports = app;