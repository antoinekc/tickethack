const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
  departure: String,
  date: Date,
  arrival: String,
})

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;
