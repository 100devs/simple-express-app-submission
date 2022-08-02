import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get customer from localStorage
const customer = JSON.parse(localStorage.getItem('customer'));

// Setting initial state of the feature
const initialState = {
  customer: customer ? customer : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register customer
export const register = createAsyncThunk(
  'auth/register',
  async (customer, thunkAPI) => {
    try {
      return await authService.register(customer);
    } catch (error) {
      // Checking in multiple places for error
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logging in
export const login = createAsyncThunk(
  'auth/login',
  async (customer, thunkAPI) => {
    try {
      return await authService.login(customer);
    } catch (error) {
      // Checking in multiple places for error
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logging out
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// Creating actual slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customer = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.customer = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customer = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.customer = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.customer = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
