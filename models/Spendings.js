const mongoose = require('mongoose');

const SpendingSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 30},
    cost: {type: Number, required: true},
    date: {type: Date, required: true},
    category: {type: String, required: true, max: 30}
});

module.exports = mongoose.model('Spendings', SpendingSchema);