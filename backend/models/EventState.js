const mongoose = require('mongoose');

const adminStateSchema = new mongoose.Schema({
  problemStatementRevealed: { type: Boolean, default: false },
  submissionEnabled: { type: Boolean, default: false }
});

module.exports = mongoose.model('EventState', adminStateSchema);