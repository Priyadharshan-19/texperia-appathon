const EventState = require('../models/EventState');
const Team = require('../models/Team');

// Get current event state (Creates default if none exists)
exports.getEventState = async (req, res) => {
  try {
    let state = await EventState.findOne();
    if (!state) {
      state = await EventState.create({});
    }
    res.json({ success: true, state });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching event state.' });
  }
};

// Toggle event phases (e.g., reveal problem, enable submissions)
exports.updateEventState = async (req, res) => {
  try {
    const { action, value } = req.body; 
    let state = await EventState.findOne();
    
    state[action] = value; // Update specific boolean flag
    await state.save();
    
    res.json({ success: true, state });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating event state.' });
  }
};

// Fetch all teams for the Admin Table
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json({ success: true, teams });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching teams.' });
  }
};

// Update marks and calculate final score automatically
exports.updateMarks = async (req, res) => {
  try {
    const { teamId, round1, final } = req.body;
    const team = await Team.findOne({ teamId });
    
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    
    if (round1 !== undefined) team.marks.round1 = Number(round1);
    if (final !== undefined) team.marks.final = Number(final);
    
    // Automatic calculation logic: Weightage 30% Round 1, 70% Final
    team.marks.total = (team.marks.round1 * 0.30) + (team.marks.final * 0.70);
    
    await team.save();
    res.json({ success: true, team });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating marks.' });
  }
};

// Get Top 3 Winners (Only if marks are locked)
exports.getWinners = async (req, res) => {
  try {
    const state = await EventState.findOne();
    
    if (!state || !state.marksLocked) {
      return res.status(403).json({ success: false, message: "Admin has not locked the marks yet!" });
    }
    
    // Sort teams by total marks in descending order and limit to top 3
    const winners = await Team.find().sort({ 'marks.total': -1 }).limit(3);
    res.json({ success: true, winners });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error calculating winners.' });
  }
};