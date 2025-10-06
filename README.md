# Solutions API

A Node.js API with TypeScript for managing departments and citizens data.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the application:**
   ```bash
   npm run dev:api
   ```

3. **Build and start:**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `GET /api/departments/:id/parent` - Get top parent
- `GET /api/departments/:id/parents` - Get all parents
- `POST /api/citizens/age` - Calculate age from RD

## Tech Stack

- Node.js + TypeScript
- Express.js
- PostgreSQL
- CORS + Helmet for security
