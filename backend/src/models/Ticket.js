const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true
    },
    contact: {
        type: String, // Could be User reference
        required: [true, 'Contact name is required']
    },
    email: {
        type: String,
        required: [true, 'Contact email is required']
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
        default: 'Open'
    },
    message: {
        type: String,
        required: [true, 'Message description is required']
    },
    last_reply: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);
