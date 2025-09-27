import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// define the user
interface UserAuth {
  _id: string | number;
  username: string;
  email: string;
  password?: string;
  isAdmin: boolean;
}

export interface UserAuthSliceState {
  userAuth: UserAuth | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: UserAuthSliceState = {
  userAuth: null,
  loading: false,
  success: false,
  error: null,
};

// sign up an user
export const register = createAsyncThunk(
  "userAuth/registerUser",
  async (userData: Partial<UserAuth>, thunkAPI) => {
    try {
      const response = await fetch("api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "register", userData }),
      });
      const data = await response.json();
      if (![200, 201].includes(response.status)) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// login an user
export const login = createAsyncThunk(
  "userAuth/login",
  async (userData: Partial<UserAuth>, thunkAPI) => {
    try {
      const response = await fetch("api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "login", userData }),
      });
      const data = await response.json();
      if (![200, 201].includes(response.status)) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// logout a user
export const logout = createAsyncThunk(
  "userAuth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "logout" }),
      });
      const data = await response.json();
      if (![200, 201].includes(response.status)) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get current user profile
export const getProfile = createAsyncThunk(
  "userAuth/getProfile",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/auth", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// update current user profile
export const updateProfile = createAsyncThunk(
  "userAuth/updateProfile",
  async (userData: Partial<UserAuth>, thunkAPI) => {
    try {
      const response = await fetch("/api/auth", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userAuth = action.payload;
        if (action.payload) {
          const { username, email, isAdmin } = action.payload;
          localStorage.setItem(
            "user",
            JSON.stringify({ username, email, isAdmin })
          );
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userAuth = action.payload;
        if (action.payload) {
          const { username, email, isAdmin } = action.payload;
          localStorage.setItem(
            "user",
            JSON.stringify({ username, email, isAdmin })
          );
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.userAuth = null;
        localStorage.removeItem("user");
      })
      // get profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = action.payload;
        if (action.payload) {
          const { username, email, isAdmin } = action.payload;
          localStorage.setItem(
            "user",
            JSON.stringify({ username, email, isAdmin })
          );
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userAuthSlice.reducer;
