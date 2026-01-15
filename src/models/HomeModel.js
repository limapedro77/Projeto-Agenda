const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  senha: String
});

module.exports = mongoose.model('Home', HomeSchema);