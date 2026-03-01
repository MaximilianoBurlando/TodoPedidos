import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// 🔒 Validación de variables críticas
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME || !DB_PORT) {
  throw new Error("Faltan variables de entorno de la DB. Revisá tu .env o variables del servidor.");
}

export const db = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT, // 👈 FALTABA ESTO
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  // 👇 ESTO ES CLAVE PARA RAILWAY
  ssl: {
    rejectUnauthorized: false
  }
});