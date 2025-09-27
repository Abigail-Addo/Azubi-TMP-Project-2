import asyncHandler from "../middlewares/asyncHandler.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Helper: recalc totals
const calculateCartTotals = (cart) => {
  cart.totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
};

// Get Cart
const getCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.json({ items: [], totalItems: 0, totalPrice: 0 });
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Add to Cart
const addToCart = asyncHandler(async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId)
      return res.status(400).json({ error: "Product ID is required" });
    if (!quantity || quantity < 1)
      return res.status(400).json({ error: "Quantity must be at least 1" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        image: product.image,
        brand: product.brand,
        price: product.price,
        quantity,
      });
    }

    calculateCartTotals(cart);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Remove from Cart (using body)
const removeFromCart = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId)
      return res.status(400).json({ error: "Product ID is required" });

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // Recalculate totals
    calculateCartTotals(cart);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update Quantity
const updateCartQuantity = asyncHandler(async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId)
      return res.status(400).json({ error: "Product ID is required" });
    if (!quantity || quantity < 1)
      return res.status(400).json({ error: "Quantity must be at least 1" });

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) return res.status(404).json({ error: "Item not found in cart" });

    item.quantity = quantity;

    calculateCartTotals(cart);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Clear Entire Cart
const clearCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.json({ message: "Cart already empty" });

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    await cart.save();

    res.json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export { getCart, addToCart, removeFromCart, updateCartQuantity, clearCart };
