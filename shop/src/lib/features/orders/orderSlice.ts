import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface OrderItem {
  product: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  paystackReference?: string;
  paystackTransactionId?: string;
  createdAt: string;
}

interface OrderSliceState {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  fetchLoading: boolean;
  createLoading: boolean;
  payLoading: boolean;
  deliverLoading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: OrderSliceState = {
  orders: [],
  order: null,
  loading: false,
  fetchLoading: false,
  createLoading: false,
  payLoading: false,
  deliverLoading: false,
  success: false,
  error: null,
};

// ==== THUNKS ====

// Fetch Orders (all, user, or single)
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (params: { id?: string; all?: boolean } = {}, thunkAPI) => {
    try {
      let url = "/api/order";
      if (params?.id) url += `?id=${params.id}`;
      else if (params?.all) url += `?all=true`;

      const res = await fetch(url);
      console.log(res);

      const data = await res.json();
      console.log(data);

      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (payload: Partial<Order>, thunkAPI) => {
    try {
      const res = await fetch("/api/order", {
        method: "POST",
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

// Pay Order (Initialize Paystack)
export const payOrder = createAsyncThunk(
  "order/payOrder",
  async (payload: { order: string; callback_url: string }, thunkAPI) => {
    try {
      const res = await fetch("/api/order", {
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

// Mark Delivered
export const markOrderDelivered = createAsyncThunk(
  "order/markOrderDelivered",
  async (payload: { orderId: string }, thunkAPI) => {
    try {
      const res = await fetch("/api/order", {
        method: "PATCH",
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

// ==== SLICE ====
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.success = false;
      state.error = null;
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.success = true;
        if (Array.isArray(action.payload)) state.orders = action.payload;
        else state.order = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.fetchLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createLoading = false;
        state.success = true;
        state.order = action.payload;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Pay Order
      .addCase(payOrder.pending, (state) => {
        state.payLoading = true;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.payLoading = false;
        state.success = true;
        state.order = action.payload.order ?? state.order;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.payLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Mark Delivered
      .addCase(markOrderDelivered.pending, (state) => {
        state.deliverLoading = true;
      })
      .addCase(markOrderDelivered.fulfilled, (state, action) => {
        state.deliverLoading = false;
        state.success = true;
        state.order = action.payload;
        state.orders = state.orders.map((o) =>
          o._id === action.payload._id ? action.payload : o
        );
      })
      .addCase(markOrderDelivered.rejected, (state, action) => {
        state.deliverLoading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
