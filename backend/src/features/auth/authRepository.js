import { db } from "../../config/db.js";
import bcrypt from "bcryptjs";

// authRepository.js
export async function findUserPasswordByEmail(mail) {
  const [rows] = await db.execute(
    "SELECT idUsuario, password FROM user WHERE mail = ?",
    [mail]
  );
  return rows[0];
}
// =========================
// Buscar usuario por email
// =========================
export async function findUserByEmail(email) {
  const [rows] = await db.execute(
    "SELECT idUsuario, name, mail, phoneNumber, description, address FROM user WHERE mail = ?",
    [email]
  );
  return rows[0];
}

// =========================
// Buscar usuario por nombre
// =========================
export async function findUserByName(name) {
  const [rows] = await db.execute(
    "SELECT idUsuario, name, mail, phoneNumber, description, address FROM user WHERE name = ?",
    [name]
  );
  return rows[0];
}

// =========================
// Buscar usuario por teléfono
// =========================
export async function findUserByPhone(phoneNumber) {
  const [rows] = await db.execute(
    "SELECT idUsuario, name, mail, phoneNumber, description, address FROM user WHERE phoneNumber = ?",
    [phoneNumber]
  );
  return rows[0];
}

// =========================
// Crear nuevo usuario
// =========================
export async function createUser(user) {
  const { name, mail, phoneNumber, password, description, address } = user;

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 12); // 12 salt rounds

  const [result] = await db.execute(
    `INSERT INTO user 
    (name, mail, phoneNumber, password, description, address)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [name, mail, phoneNumber, hashedPassword, description, address]
  );

  return {
    idUsuario: result.insertId,
    name,
    mail,
    phoneNumber,
    description,
    address
  };
}