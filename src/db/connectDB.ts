import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("⚠️ DATABASE_URL not set in .env");
}
const sql = postgres(connectionString);

async function testDB() {
  try {
    const result = await sql`SELECT 1+1 AS result;`;
    console.log("✅ DB connected! Test query result:", result[0].result);
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
}

export { sql, testDB };
