import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const database = process.env.DB_DATABASE;

async function connectToDatabase() {
  try {
    const db = await mysql.createConnection({
      host: host,
      user: user,
      password: pass,
      database: database,
      port: 3306,
    });

    return db;
  } catch (err) {
    console.log("Database Connection Error", err.stack);

    throw new Error("Failed to connect to the database");
  }
}

export default connectToDatabase;
