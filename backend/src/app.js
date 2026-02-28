import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./features/auth/authRouter.js";
import clientRouter from "./features/clients/clientRouter.js";
import productRouter from "./features/products/productRouter.js";
import orderRouter from "./features/orders/orderRouter.js";
import providerRouter from "./features/providers/providerRouter.js";
import userRouter from "./features/users/userRouter.js";

// ============================
// Configuración base
// ============================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env desde la raíz del backend
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// ============================
// Middlewares globales
// ============================

app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ============================
// Rate limiter (solo auth)
// ============================

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message: "Demasiadas solicitudes. Intenta de nuevo más tarde."
  }
});

// ============================
// Rutas API
// ============================

app.use("/api/auth", authLimiter, authRouter);
app.use("/api/clients", clientRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/providers", providerRouter);
app.use("/api/users", userRouter);

// ============================
// Servir frontend en producción
// ============================

if (process.env.NODE_ENV === "production") {
  const buildPath = path.resolve(__dirname, "../../appFront/dist");

  app.use(express.static(buildPath));

  // Catch-all SIN usar wildcard problemático
  app.use((req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// ============================
// Middleware global de errores
// ============================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: "Something went wrong"
  });
});

// ============================
// Iniciar servidor
// ============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`
  );
});