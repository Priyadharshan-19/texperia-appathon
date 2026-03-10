const express = require('express');
const router = express.Router();
const Team = require('../models/Team'); 
const AdminState = require('../models/EventState'); // Fixed the path here!

// GET Admin State (Only tracking submissionEnabled now)
router.get('/state', async (req, res) => {
  try {
    let state = await AdminState.findOne();
    if (!state) state = await AdminState.create({});
    res.json({ state });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT Admin State (Toggle Submissions)
router.put('/state', async (req, res) => {
  try {
    const { action, value } = req.body;
    let state = await AdminState.findOne();
    
    // We only need to handle submissions now!
    if (action === 'submissionEnabled') {
      state.submissionEnabled = value;
    }
    
    await state.save();
    res.json({ message: 'State updated', state });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET Status (Problem Statement Reveal Check)
router.get('/status', async (req, res) => {
  try {
    let state = await AdminState.findOne();
    res.json({ problemStatementRevealed: state ? state.problemStatementRevealed : false });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST Reveal Problem Statements
router.post('/reveal', async (req, res) => {
  try {
    let state = await AdminState.findOne();
    if (!state) state = await AdminState.create({});
    
    state.problemStatementRevealed = true;
    await state.save();
    res.json({ message: 'Problem statements revealed!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET All Teams
router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find().select('-password');
    res.json({ teams });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT Update Marks
router.put('/marks', async (req, res) => {
  try {
    const { teamId, round1, final } = req.body;
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    if (round1 !== undefined) team.marks.round1 = Number(round1);
    if (final !== undefined) team.marks.final = Number(final);
    
    team.marks.total = (team.marks.round1 || 0) + (team.marks.final || 0);
    await team.save();
    
    res.json({ message: 'Marks updated', team });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST Notify Team
router.post('/notify/:teamId', async (req, res) => {
  try {
    const { round } = req.body;
    const team = await Team.findById(req.params.teamId);
    
    if (round === 'r1') team.notifications.r1Completed = true;
    if (round === 'final') team.notifications.finalCompleted = true;
    
    await team.save();
    res.json({ message: 'Notification sent' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE Clear Database (Danger Zone)
router.delete('/clear-teams', async (req, res) => {
  try {
    await Team.deleteMany({});
    res.json({ message: 'Database wiped successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET Winners (Keeping this so your WinnerReveal.jsx page still works!)
router.get('/winners', async (req, res) => {
  try {
    const teams = await Team.find().sort({ 'marks.total': -1 }).limit(3);
    res.json({ winners: teams });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;