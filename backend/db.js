import mysql from "mysql2/promise";
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
    });
    console.log("Database is connected");
    return db;
  } catch (err) {
    console.log("Database Connection Error", err.stack);
  }
}

export default connectToDatabase;
