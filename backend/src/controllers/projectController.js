const { pool } = require('../config/database');

// @desc    Get all projects
exports.getProjects = async (req, res) => {
    try {
        const [projects] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get single project
exports.getProject = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
        const project = rows[0];

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Create new project
exports.createProject = async (req, res) => {
    try {
        const { name, client, start_date, deadline, status, progress, description, budget } = req.body;

        const [result] = await pool.query(
            'INSERT INTO projects (name, client, start_date, deadline, status, progress, description, budget) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, client, start_date, deadline, status || 'Not Started', progress || 0, description, budget]
        );

        const newProject = { id: result.insertId, ...req.body };

        res.status(201).json({
            success: true,
            data: newProject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Update project
exports.updateProject = async (req, res) => {
    try {
        const { name, client, start_date, deadline, status, progress, description, budget } = req.body;

        // Check if project exists
        const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        await pool.query(
            'UPDATE projects SET name=?, client=?, start_date=?, deadline=?, status=?, progress=?, description=?, budget=? WHERE id=?',
            [name, client, start_date, deadline, status, progress, description, budget, req.params.id]
        );

        const updatedProject = { id: req.params.id, ...req.body };

        res.status(200).json({
            success: true,
            data: updatedProject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Delete project
exports.deleteProject = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Project removed',
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
