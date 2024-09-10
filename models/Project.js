const mongoose = require('mongoose');

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  description: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

// Define the Project schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  createdDate: { type: Date, default: Date.now },
  todos: [todoSchema]
});

module.exports = mongoose.model('Project', projectSchema);
