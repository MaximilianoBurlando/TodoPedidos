import express from "express";
import {
  createClient,
  getClients,
  updateClient,
  deleteClient
} from "./clientController.js";

import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getClients);
router.post("/", authMiddleware, createClient);
router.put("/:id", authMiddleware, updateClient);
router.delete("/:id", authMiddleware, deleteClient);

export default router;