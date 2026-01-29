const express = require('express');
const router = express.Router();
const {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
} = require('../controllers/ticketController');

// TODO: Add auth middleware when ready
// const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getTickets)
    .post(createTicket);

router.route('/:id')
    .get(getTicket)
    .put(updateTicket)
    .delete(deleteTicket);

module.exports = router;
