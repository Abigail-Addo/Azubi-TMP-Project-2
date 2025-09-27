import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Review {
  name: string;
  rating: number;
  comment: string;
  user: string;
  _id: string;
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  brand: string;
  image: string;
  rating: number;
  numReviews: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

interface ProductSliceState {
  products: Product[];
  topProducts: Product[];
  newProducts: Product[];
  filteredProducts: Product[];
  createLoading: boolean;
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean;
  reviewLoading: boolean;
  filterLoading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ProductSliceState = {
  products: [],
  topProducts: [],
  newProducts: [],
  filteredProducts: [],
  createLoading: false,
  fetchAllLoading: false,
  fetchOneLoading: false,
  editLoading: false,
  deleteLoading: false,
  reviewLoading: false,
  filterLoading: false,
  success: false,
  error: null,
};

// ==== THUNKS ====

// Create
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData: FormData, thunkAPI) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Get All (paginated list)
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Get All (full set - /products/all)
export const getAllProductsFull = createAsyncThunk(
  "products/getAllProductsFull",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/products?type=all");
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Get One
export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (productId: string | null, thunkAPI) => {
    try {
      if (!productId) throw new Error("No productId provided");
      const res = await fetch(`/api/products?productId=${productId}`);
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Get Top Products
export const getTopProducts = createAsyncThunk(
  "products/getTopProducts",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/products?type=top");
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Get New Products
export const getNewProducts = createAsyncThunk(
  "products/getNewProducts",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/products?type=new");
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Update
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    payload: { productId: string | null; formData: FormData },
    thunkAPI
  ) => {
    try {
      const { productId, formData } = payload;
      if (!productId) throw new Error("No productId provided");
      const res = await fetch(`/api/products?productId=${productId}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Delete
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string | null, thunkAPI) => {
    try {
      if (!productId) throw new Error("No productId provided");
      const res = await fetch(`/api/products?productId=${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Add Review
export const addProductReview = createAsyncThunk(
  "products/addProductReview",
  async (
    payload: {
      productId: string | null;
      review: { rating: number; comment: string };
    },
    thunkAPI
  ) => {
    try {
      const { productId, review } = payload;
      if (!productId) throw new Error("No productId provided");
      const res = await fetch(`/api/products?productId=${productId}`, {
        method: "PATCH",
        body: JSON.stringify(review),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Filter Products
export const filterProducts = createAsyncThunk(
  "products/filterProducts",
  async (payload: { checked: string[]; radio: number[] }, thunkAPI) => {
    try {
      const res = await fetch(`/api/products`, {
        method: "OPTIONS",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
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
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createProduct.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createLoading = false;
        state.success = true;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Get All
      .addCase(getAllProducts.pending, (state) => {
        state.fetchAllLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.fetchAllLoading = false;
        state.success = true;
        state.products = action.payload.products;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.fetchAllLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Get All (full)
      .addCase(getAllProductsFull.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      // Get One
      .addCase(getSingleProduct.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.fetchOneLoading = false;
        state.success = true;
        state.products = state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.fetchOneLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Get Top
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.topProducts = action.payload;
      })

      // Get New
      .addCase(getNewProducts.fulfilled, (state, action) => {
        state.newProducts = action.payload;
      })

      // Update
      .addCase(updateProduct.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.editLoading = false;
        state.success = true;
        state.products = state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.editLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteProduct.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.success = true;
        state.products = state.products.filter(
          (p) => p._id !== action.payload._id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Add Review
      .addCase(addProductReview.pending, (state) => {
        state.reviewLoading = true;
      })
      .addCase(addProductReview.fulfilled, (state) => {
        state.reviewLoading = false;
        state.success = true;
      })
      .addCase(addProductReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Filter
      .addCase(filterProducts.pending, (state) => {
        state.filterLoading = true;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.filterLoading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.filterLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
