// src/lib/features/users/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface UserState {
  user: User[];
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: [],
  fetchAllLoading: false,
  fetchOneLoading: false,
  editLoading: false,
  deleteLoading: false,
  success: false,
  error: null,
};

// get all
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/users");
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
export const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (userId: string | null, thunkAPI) => {
    try {
      if (!userId) throw new Error("No userId provided");
      const res = await fetch(`/api/users?userId=${userId}`);
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// ----- UPDATE USER BY ID -----
export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async (
    payload: { userId: string | null; userData: Partial<User> },
    thunkAPI
  ) => {
    try {
      const { userId, userData } = payload;
      if (!userId) throw new Error("No userId provided");
      const res = await fetch(`/api/users?userId=${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// ----- DELETE USER BY ID -----
export const deleteUserById = createAsyncThunk(
  "user/deleteUserById",
  async (userId: string, thunkAPI) => {
    try {
      if (!userId) throw new Error("No userId provided");
      const res = await fetch(`/api/users?userId=${userId}`, {
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllUsers.pending, (state) => {
        state.fetchAllLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.fetchAllLoading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.fetchAllLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Get One
      .addCase(getSingleUser.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.fetchOneLoading = false;
        state.success = true;
        state.user = state.user.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.fetchOneLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateUserById.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.editLoading = false;
        state.success = true;
        state.user = state.user.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.editLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteUserById.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.success = true;
        state.user = state.user.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.deleteLoading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
