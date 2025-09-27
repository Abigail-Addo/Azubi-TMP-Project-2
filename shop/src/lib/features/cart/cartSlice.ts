import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  _id: string;
  user: string;
  product: string;
  name: string;
  image: string;
  brand: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartSliceState {
  cart: Cart | null;
  loading: boolean;
  addLoading: boolean;
  updateLoading: boolean;
  removeLoading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: CartSliceState = {
  cart: null,
  loading: false,
  addLoading: false,
  updateLoading: false,
  removeLoading: false,
  success: false,
  error: null,
};

// ==== THUNKS ====

// Get Cart
export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    const res = await fetch("/api/cart");
    const data = await res.json();
    if (!res.ok) return thunkAPI.rejectWithValue(data.message);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

// Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload: { productId: string; quantity: number }, thunkAPI) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(res);
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      console.log(data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Update Quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async (payload: { productId: string; quantity: number }, thunkAPI) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Remove from Cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (payload: { productId: string }, thunkAPI) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.error || data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : String(err)
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message || data.error);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : String(err)
      );
    }
  }
);

// ==== SLICE ====
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addLoading = false;
        state.success = true;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Update Quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.success = true;
        state.cart = action.payload;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.updateLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.removeLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.removeLoading = false;
        state.success = true;
        state.cart = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.removeLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      // Clear Cart (NEW)
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.cart = { items: [], totalItems: 0, totalPrice: 0 };
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

// export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
