const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

let adminState = {
  round1Enabled: false,
  submissionEnabled: false,
  finalEnabled: false,
  marksLocked: false,
  winnerRevealStarted: false
};

// 1. GET ALL TEAMS
router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find({}).select('-password');
    res.json({ teams });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching teams." });
  }
});

// 2. GET ADMIN STATE
router.get('/state', (req, res) => res.json({ state: adminState }));

// 3. UPDATE ADMIN STATE
router.put('/state', (req, res) => {
  const { action, value } = req.body;
  if (adminState.hasOwnProperty(action)) adminState[action] = value;
  res.json({ message: "State updated successfully", state: adminState });
});

// 4. UPDATE MARKS & CALCULATE TOTAL
router.put('/marks', async (req, res) => {
  try {
    const { teamId, round1, final } = req.body;
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (adminState.marksLocked) return res.status(403).json({ message: "Marks locked." });

    if (round1 !== undefined) team.marks.round1 = Number(round1);
    if (final !== undefined) team.marks.final = Number(final);

    // Direct addition (Round 1 out of 30, Final out of 70)
    team.marks.total = team.marks.round1 + team.marks.final;
    
    await team.save();
    res.json({ message: "Marks updated!", marks: team.marks });
  } catch (error) {
    res.status(500).json({ message: "Server error calculating marks." });
  }
});

// 5. SEND NOTIFICATION
router.post('/notify/:teamId', async (req, res) => {
  try {
    const { round } = req.body; 
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (!team.notifications) team.notifications = {};
    
    if (round === 'r1') team.notifications.r1Completed = true;
    if (round === 'final') team.notifications.finalCompleted = true;

    await team.save();
    res.json({ message: `Notification sent for ${round}!` });
  } catch (error) {
    console.error("Notify Error:", error);
    res.status(500).json({ message: "Server error sending notification." });
  }
});

// 6. GET TOP 3 WINNERS
router.get('/winners', async (req, res) => {
  try {
    const winners = await Team.find({}).sort({ 'marks.total': -1 }).limit(3).select('-password');
    res.json({ winners });
  } catch (error) {
    console.error("Error fetching winners:", error);
    res.status(500).json({ message: "Server error fetching winners." });
  }
});

// ==========================================
// 7. DANGER ZONE: CLEAR ALL TEAMS
// ==========================================
router.delete('/clear-teams', async (req, res) => {
  try {
    // Delete every single team in the database
    await Team.deleteMany({});
    
    // Reset the global admin toggles back to default
    adminState = {
      round1Enabled: false,
      submissionEnabled: false,
      finalEnabled: false,
      marksLocked: false,
      winnerRevealStarted: false
    };

    console.log("🧨 DATABASE WIPED: All teams deleted.");
    res.json({ message: "All teams have been successfully deleted!" });
  } catch (error) {
    console.error("Error clearing database:", error);
    res.status(500).json({ message: "Server error wiping database." });
  }
});

module.exports = router;