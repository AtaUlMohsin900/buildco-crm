const { pool } = require('../config/database');

// @desc    Get all tickets
exports.getTickets = async (req, res) => {
    try {
        const [tickets] = await pool.query('SELECT * FROM tickets ORDER BY created_at DESC');
        res.status(200).json({
            success: true,
            count: tickets.length,
            data: tickets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get single ticket
exports.getTicket = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
        const ticket = rows[0];

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }

        res.status(200).json({
            success: true,
            data: ticket
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Create new ticket
exports.createTicket = async (req, res) => {
    try {
        const { subject, contact, email, priority, status, message } = req.body;

        const [result] = await pool.query(
            'INSERT INTO tickets (subject, contact, email, priority, status, message) VALUES (?, ?, ?, ?, ?, ?)',
            [subject, contact, email, priority || 'Medium', status || 'Open', message]
        );

        const newTicket = { id: result.insertId, ...req.body };

        res.status(201).json({
            success: true,
            data: newTicket
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Update ticket
exports.updateTicket = async (req, res) => {
    try {
        const { subject, contact, email, priority, status, message } = req.body;

        // Check if ticket exists
        const [rows] = await pool.query('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }

        await pool.query(
            'UPDATE tickets SET subject=?, contact=?, email=?, priority=?, status=?, message=? WHERE id=?',
            [subject, contact, email, priority, status, message, req.params.id]
        );

        const updatedTicket = { id: req.params.id, ...req.body };

        res.status(200).json({
            success: true,
            data: updatedTicket
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Delete ticket
exports.deleteTicket = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tickets WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ticket removed',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};
