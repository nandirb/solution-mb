import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { errorHandler } from "./middleware";
import { testDB } from "./db/connectDB";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

async function startServer() {
  try {
    await testDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API Documentation:`);
      console.log(`   GET /api/departments - Get all departments`);
      console.log(`   GET /api/departments/:id - Get department by ID`);
      console.log(`   GET /api/departments/:id/parent - Get top parent`);
      console.log(`   GET /api/departments/:id/parents - Get all parents`);
      console.log(`   POST /api/citizens/age - Calculate age from RD`);

    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

export { app, startServer };
