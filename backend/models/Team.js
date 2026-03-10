const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  // Added trim to prevent " APP26-001 " spacing bugs
  teamId: { type: String, required: true, unique: true, trim: true }, 
  
  // Added trim so logins never fail due to accidental spaces
  teamName: { type: String, required: true, unique: true, trim: true },
  
  password: { type: String, required: true },
  
  leaderName: { type: String, required: true, trim: true },
  leaderContact: { type: String, required: true, trim: true },
  members: [{ type: String, trim: true }], 
  
  chosenProblem: { type: Number, default: null }, 
  
  marks: {
    round1: { type: Number, default: 0 },
    final: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  
  submission: {
    githubLink: { type: String, default: "", trim: true },
    deployLink: { type: String, default: "", trim: true },
    submittedAt: { type: Date, default: null }
  },
  
  notifications: {
    r1Completed: { type: Boolean, default: false },
    finalCompleted: { type: Boolean, default: false }
  }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);