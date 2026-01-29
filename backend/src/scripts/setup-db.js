const { pool } = require('../config/database');

async function createTables() {
    try {
        console.log('Creating tables...');

        // Projects Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                client VARCHAR(255) NOT NULL,
                start_date DATE NOT NULL,
                deadline DATE NOT NULL,
                status ENUM('Not Started', 'In Progress', 'On Hold', 'Completed', 'Cancelled') DEFAULT 'Not Started',
                progress TINYINT UNSIGNED DEFAULT 0,
                description TEXT,
                budget DECIMAL(10, 2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Projects table created');

        // Tickets Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tickets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                subject VARCHAR(255) NOT NULL,
                contact VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                priority ENUM('Low', 'Medium', 'High', 'Urgent') DEFAULT 'Medium',
                status ENUM('Open', 'In Progress', 'Resolved', 'Closed') DEFAULT 'Open',
                message TEXT NOT NULL,
                last_reply TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Tickets table created');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating tables:', error);
        process.exit(1);
    }
}

createTables();
