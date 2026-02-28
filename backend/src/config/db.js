import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// 🔒 Validación de variables críticas
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error("Faltan variables de entorno de la DB. Revisá tu .env o variables del servidor.");
}

export const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Ajustable según producción
  queueLimit: 0
});