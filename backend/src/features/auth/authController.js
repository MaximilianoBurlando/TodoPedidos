import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { 
  findUserByEmail, 
  findUserByName,
  findUserByPhone,
  createUser,
  findUserPasswordByEmail 
} from "./authRepository.js";

// =========================
// REGISTER
// =========================
export async function register(req, res) {
  try {
    const { name, mail, phoneNumber, password, description, address } = req.body;

    if (!name || !mail || !password) {
      return res.status(400).json({
        error: "Name, mail and password are required"
      });
    }

    // 🔎 Validaciones
    const existingEmail = await findUserByEmail(mail);
    if (existingEmail) {
      return res.status(409).json({
        error: "Email already in use"
      });
    }

    const existingName = await findUserByName(name);
    if (existingName) {
      return res.status(409).json({
        error: "Name already in use"
      });
    }

    if (phoneNumber) {
      const existingPhone = await findUserByPhone(phoneNumber);
      if (existingPhone) {
        return res.status(409).json({
          error: "Phone number already in use"
        });
      }
    }

    const newUser = await createUser({
      name,
      mail,
      phoneNumber,
      password, // pasar la contraseña plana
      description,
      address
    });

    res.status(201).json({
      ok: true,
      user: newUser
    });

  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      error: "Internal server error"
    });
  }
}

// =========================
// LOGIN
// =========================
export async function login(req, res) {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res.status(400).json({
        error: "Mail and password are required"
      });
    }

    const user = await findUserByEmail(mail); // sin password
    const userPassword = await findUserPasswordByEmail(mail); // con password

    if (!user || !userPassword || !userPassword.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userPassword.password);
        const token = jwt.sign(
          { userId: user.idUsuario },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
    );

    res.json({
      ok: true,
      token,
      user: {
        idUsuario: user.idUsuario,
        name: user.name,
        mail: user.mail
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      error: "Internal server error"
    });
  }
}