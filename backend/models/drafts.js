// Optional: pre-save hook to auto-calculate totals
cartSchema.pre("save", function (next) {
  this.totalItems = this.items.reduce((acc, item) => acc + item.quantity, 0);
  this.totalPrice = this.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  next();
});

// ✅ Fetch user cart (for loading cart page)
// router.route("/").get(authenticate, getCart);
// ✅ Add to cart
// router.route("/").post(authenticate, addToCart);

// ✅ Update cart item quantity
// router.route("/").put(authenticate, updateCartQuantity);

// ✅ Remove item from cart
// router.route("/:productId").delete(authenticate, checkId, removeFromCart);
