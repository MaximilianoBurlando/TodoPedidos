import fs from 'fs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import url from 'url';

// ES Modules: obtener __dirname
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar el .env que está en la carpeta del script
dotenv.config({ path: path.join(__dirname, '.env') });

// DEBUG: verificar carga
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '******' : undefined);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

// Ruta absoluta a tu SQL
const sqlPath = path.resolve('C:/Users/Maxi/Documents/Proyectos WEB/BDDTP/TodoPedidos.sql');

console.log('Leyendo SQL desde:', sqlPath);

async function runSQL() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      multipleStatements: true,
    });

    const sql = fs.readFileSync(sqlPath, 'utf-8');

    await connection.query(sql);

    console.log('✅ SQL ejecutado correctamente en Railway');

    await connection.end();
  } catch (err) {
    console.error('❌ Error ejecutando SQL:', err);
  }
}

runSQL();