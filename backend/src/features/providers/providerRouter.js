import express from "express";

import {
  createProvider,
  getProviders,
  getProviderById,
  updateProvider,
  deleteProvider
} from "./providerController.js";

import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProvider);

router.get("/", authMiddleware, getProviders);

router.get("/:id", authMiddleware, getProviderById);

router.put("/:id", authMiddleware, updateProvider);

router.delete("/:id", authMiddleware, deleteProvider);

export default router;
