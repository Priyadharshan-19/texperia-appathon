const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const Team = require('../models/Team');

// 1. REGISTER NEW TEAM
router.post('/register', async (req, res) => {
  try {
    const { teamName, password, leaderName, leaderContact, member1, member2, member3 } = req.body;

    // Check if team name already exists
    const existingTeam = await Team.findOne({ teamName });
    if (existingTeam) {
      return res.status(400).json({ message: "Team Name is already taken! Try another." });
    }

    // --- AUTO-GENERATE TEAM ID (APP26-001, APP26-002, etc.) ---
    const totalTeamsCount = await Team.countDocuments();
    const generatedTeamId = `APP26-${String(totalTeamsCount + 1).padStart(3, '0')}`;

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Filter out empty member names
    const membersArray = [member1, member2, member3].filter(Boolean);

    // Save to Database
    const newTeam = new Team({
      teamId: generatedTeamId,
      teamName,
      password: hashedPassword,
      leaderName,
      leaderContact,
      members: membersArray
    });

    const savedTeam = await newTeam.save();

    res.status(201).json({ teamId: savedTeam._id, message: "Registration successful!" });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// 2. LOGIN EXISTING TEAM
router.post('/login', async (req, res) => {
  try {
    const { teamName, password } = req.body;

    const team = await Team.findOne({ teamName });
    if (!team) {
      return res.status(400).json({ message: "Team not found. Have you registered yet?" });
    }

    const isMatch = await bcrypt.compare(password, team.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    res.json({ teamId: team._id, message: "Login successful!" });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
});

// 3. GET TEAM DASHBOARD INFO
router.get('/:teamId', async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    const { password, ...safeTeamData } = team._doc;
    res.json(safeTeamData);

  } catch (error) {
    console.error("Fetch Team Error:", error);
    res.status(500).json({ message: "Server error fetching team details." });
  }
});

// 4. LOCK IN PROBLEM STATEMENT
router.post('/:teamId/select-problem', async (req, res) => {
  try {
    const { chosenProblem } = req.body;
    const team = await Team.findById(req.params.teamId);

    if (!team) return res.status(404).json({ message: "Team not found" });
    
    if (team.chosenProblem) {
      return res.status(400).json({ message: "You have already locked in a problem statement!" });
    }

    team.chosenProblem = chosenProblem;
    await team.save();

    res.json({ message: "Problem locked in successfully!" });

  } catch (error) {
    console.error("Selection Error:", error);
    res.status(500).json({ message: "Server error saving problem selection." });
  }
});

// 5. SUBMIT PROJECT
router.post('/:teamId/submit-project', async (req, res) => {
  try {
    const { githubLink, deployLink } = req.body;
    const team = await Team.findById(req.params.teamId);

    if (!team) return res.status(404).json({ message: "Team not found" });

    // Save the submission
    team.submission = {
      githubLink,
      deployLink,
      submittedAt: new Date()
    };

    await team.save();

    res.json({ message: "Project submitted successfully!" });

  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({ message: "Server error during submission." });
  }
});

module.exports = router;