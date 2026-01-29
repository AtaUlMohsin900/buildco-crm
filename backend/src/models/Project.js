const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true
    },
    client: {
        type: String, // Ideally this would be a reference to a Client model
        required: [true, 'Client name is required']
    },
    start_date: {
        type: Date,
        required: [true, 'Start date is required']
    },
    deadline: {
        type: Date,
        required: [true, 'Deadline is required']
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'On Hold', 'Completed', 'Cancelled'],
        default: 'Not Started'
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    description: String,
    budget: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);
