# Buildco CRM Migration

This project is a migration of the Perfex CRM to a modern stack using React, Node.js, and MySQL.

## Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MySQL

## Prerequisites

- Node.js (v18+)
- MySQL Server

## Getting Started

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Configure Database**
   Edit `backend/.env` with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=buildco_crm
   ```

3. **Run the Application**
   ```bash
   npm start
   ```
   - Frontend will run on `http://localhost:3000`
   - Backend will run on `http://localhost:5000`

## Project Structure

- `frontend/`: React application
- `backend/`: Node.js Express API
- `MIGRATION_PLAN.md`: Detailed migration strategy

## Current Status

- ✅ Project Structure Setup
- ✅ Frontend Layout & Value UI
- ✅ Authentication (Mock)
- ✅ Dashboard (UI)
- ✅ Clients & Invoices (UI Lists)
- 🚧 Database Integration
- 🚧 Other Modules (Placeholders created)
