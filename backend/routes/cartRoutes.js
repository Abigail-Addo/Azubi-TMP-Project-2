import express from "express";
const router = express.Router();
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCart,
  clearCart,
} from "../controllers/cartController.js";

import { authenticate } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .get(authenticate, getCart)
  .post(authenticate, addToCart)
  .delete(authenticate, removeFromCart);

router.route("/:id").put(authenticate, updateCartQuantity);

router.delete("/clear", authenticate, clearCart);

export default router;
