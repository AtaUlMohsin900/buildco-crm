const express = require('express');
const router = express.Router();

// Mock Auth Controllers for now
const login = (req, res) => {
    const { email, password } = req.body;
    // Simple mock logic
    if (email === 'admin@buildco.com' && password === 'admin123') {
        return res.json({
            success: true,
            token: 'mock-jwt-token',
            user: {
                id: 1,
                name: 'Admin User',
                email: 'admin@buildco.com',
                role: 'Administrator'
            }
        });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
}

const me = (req, res) => {
    // Mock user
    res.json({
        id: 1,
        name: 'Admin User',
        email: 'admin@buildco.com',
        role: 'Administrator'
    });
}

const logout = (req, res) => {
    res.json({ success: true, message: 'Logged out successfully' });
}

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', me);

module.exports = router;
