import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import inventoryService from './inventoryService';

const initialState = {
  inventory: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new inventory item
export const createInventoryItem = createAsyncThunk(
  'inventory/create',
  async (inventoryData, thunkAPI) => {
    try {
      return await inventoryService.createInventoryItem(inventoryData);
    } catch (error) {
      // Checking in multiple places for error
      const message =
        (error.response &&
          error.response.date &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get inventory items
export const getInventory = createAsyncThunk(
  'inventory/getAll',
  async (_, thunkAPI) => {
    try {
      return await inventoryService.getInventory();
    } catch (error) {
      // Checking in multiple places for error
      const message =
        (error.response &&
          error.response.date &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete inventory item
// TODO this route is should be protected, how can I only let a admin delete items? do I still use a token?
export const deleteInventoryItem = createAsyncThunk(
  'inventory/delete',
  async (id, thunkAPI) => {
    try {
      return await inventoryService.deleteInventoryItem(id);
    } catch (error) {
      // Checking in multiple places for error
      const message =
        (error.response &&
          error.response.date &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update inventory item
// TODO this route is should be protected, how can I only let admin update items? do I still use a token?
export const updateInventoryItem = createAsyncThunk(
  'inventory/update',
  async (inventoryData, thunkAPI) => {
    try {
      const { id, body } = inventoryData;
      return await inventoryService.updateInventoryItem(id, body);
    } catch (error) {
      // Checking in multiple places for error
      const message =
        (error.response &&
          error.response.date &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Inventory Slice
export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInventoryItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInventoryItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.inventory.push(action.payload);
      })
      .addCase(createInventoryItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getInventory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.inventory = action.payload;
      })
      .addCase(getInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteInventoryItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInventoryItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.inventory = state.inventory.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteInventoryItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateInventoryItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInventoryItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const itemIndex = state.inventory.findIndex(
          (item) => item._id === action.payload._id
        );
        state.inventory.splice(itemIndex, 1, action.payload);
        console.log(action.payload);
      })
      .addCase(updateInventoryItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = inventorySlice.actions;
export default inventorySlice.reducer;
