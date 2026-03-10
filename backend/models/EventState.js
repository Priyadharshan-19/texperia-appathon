const mongoose = require('mongoose');

// Renamed variable to match the file name for cleaner code!
const eventStateSchema = new mongoose.Schema({
  problemStatementRevealed: { type: Boolean, default: false },
  submissionEnabled: { type: Boolean, default: false }
}, { timestamps: true }); // ⬅️ Added this for an automatic Admin audit log!

module.exports = mongoose.model('EventState', eventStateSchema);