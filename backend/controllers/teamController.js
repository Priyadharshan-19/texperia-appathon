const Team = require('../models/Team');

// Register a new team at the venue
exports.registerTeam = async (req, res) => {
  try {
    const { teamName, leaderName, leaderContact, members } = req.body;
    
    // Auto-generate Team ID (e.g., APP26-001)
    const teamCount = await Team.countDocuments();
    const teamId = `APP26-${String(teamCount + 1).padStart(3, '0')}`;
    
    const newTeam = new Team({ 
      teamId, 
      teamName, 
      leaderName, 
      leaderContact, 
      members 
    });
    
    await newTeam.save();
    res.status(201).json({ success: true, team: newTeam });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

// Fetch team details for the Dashboard
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ teamId: req.params.teamId });
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found.' });
    }
    res.json({ success: true, team });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching team.' });
  }
};