const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true }, 
  teamName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  leaderName: { type: String, required: true },
  leaderContact: { type: String, required: true },
  members: [{ type: String }], 
  chosenProblem: { type: Number, default: null }, 
  marks: {
    round1: { type: Number, default: 0 },
    final: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  submission: {
    githubLink: { type: String, default: "" },
    deployLink: { type: String, default: "" },
    submittedAt: { type: Date, default: null }
  },
  // NEW: Tracking which notifications the Admin has sent
  notifications: {
    r1Completed: { type: Boolean, default: false },
    finalCompleted: { type: Boolean, default: false }
  }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);