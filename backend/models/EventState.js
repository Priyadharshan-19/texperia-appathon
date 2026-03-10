const mongoose = require('mongoose');

// This acts as a global switchboard for the Admin panel
const eventStateSchema = new mongoose.Schema({
  problemRevealed: { type: Boolean, default: false },
  submissionEnabled: { type: Boolean, default: false },
  round1Enabled: { type: Boolean, default: false },
  finalEnabled: { type: Boolean, default: false },
  marksLocked: { type: Boolean, default: false },
  winnerRevealStarted: { type: Boolean, default: false }
});

module.exports = mongoose.model('EventState', eventStateSchema);