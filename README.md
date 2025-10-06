# Tech Exam Solutions

This workspace is set up for your tech exam with Node.js and PostgreSQL integration.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure database:**
   - Copy the database configuration in `config.js`
   - Update the database credentials to match your PostgreSQL setup
   - Create a database named `tech_exam_db` (or update the name in config)

3. **Run the application:**
   ```bash
   npm start
   ```

## Project Structure

- `index.js` - Main application file with PostgreSQL connection
- `config.js` - Database and application configuration
- `package.json` - Dependencies and scripts

## Database Connection

The application uses a PostgreSQL connection pool and includes:
- Connection testing
- Example query execution
- Graceful shutdown handling
