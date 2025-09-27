import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Category {
  _id: string;
  name: string;
}

interface CategorySliceState {
  category: Category[];
  createLoading: boolean;
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: CategorySliceState = {
  category: [],
  createLoading: false,
  fetchAllLoading: false,
  fetchOneLoading: false,
  editLoading: false,
  deleteLoading: false,
  success: false,
  error: null,
};

// ==== THUNKS ====

// Create
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (categoryData: Partial<Category>, thunkAPI) => {
    try {
      const res = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });
      console.log(res);

      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      console.log(data, res.status);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Get All
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/category");
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

// Get One
export const getSingleCategory = createAsyncThunk(
  "category/getSingleCategory",
  async (categoryId: string | null, thunkAPI) => {
    try {
      if (!categoryId) throw new Error("No categoryId provided");
      const res = await fetch(`/api/category?categoryId=${categoryId}`);
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Update
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (
    payload: { categoryId: string | null; categoryData: Partial<Category> },
    thunkAPI
  ) => {
    try {
      const { categoryId, categoryData } = payload;
      if (!categoryId) throw new Error("No categoryId provided");
      const res = await fetch(`/api/category?categoryId=${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
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
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId: string | null, thunkAPI) => {
    try {
      if (!categoryId) throw new Error("No categoryId provided");
      const res = await fetch(`/api/category?categoryId=${categoryId}`, {
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

// ==== SLICE ====
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCategory.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.createLoading = false;
        state.success = true;
        state.category.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.createLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Get All
      .addCase(getAllCategories.pending, (state) => {
        state.fetchAllLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.fetchAllLoading = false;
        state.success = true;
        state.category = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.fetchAllLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Get One
      .addCase(getSingleCategory.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(getSingleCategory.fulfilled, (state, action) => {
        state.fetchOneLoading = false;
        state.success = true;
        state.category = state.category.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
      })
      .addCase(getSingleCategory.rejected, (state, action) => {
        state.fetchOneLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateCategory.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.editLoading = false;
        state.success = true;
        state.category = state.category.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.editLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteCategory.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.success = true;
        state.category = state.category.filter(
          (c) => c._id !== action.payload._id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteLoading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
