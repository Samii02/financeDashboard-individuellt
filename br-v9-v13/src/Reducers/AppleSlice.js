import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "ihSjwD1zetWBa6IdDZPyteD1fw0DihGa";
const BASE_URL = "https://financialmodelingprep.com/api/v3";

// Async thunk for fetching stock price change for AAPL (Apple)
export const fetchStockPriceChange = createAsyncThunk(
  "stock/fetchPriceChange", // Action type string
  async (thunkAPI) => {
    try {
      const response = await fetch(
        `${BASE_URL}/stock-price-change/AAPL?apikey=${API_KEY}`
      );
      const data = await response.json();
      return data[0] || {}; // API returns an array with a single object for AAPL
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Creating the stock slice using Redux Toolkit's createSlice
const stockSlice = createSlice({
  name: "stock",
  initialState: {
    priceChange: null,
    loading: false,
    error: null,
  },
  reducers: {}, // No additional reducers (actions) defined in this slice
  extraReducers: (builder) => {
    builder
    // Handling the pending state when the fetch request is in progress
      .addCase(fetchStockPriceChange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handling the fulfilled state when the fetch request is successful
      .addCase(fetchStockPriceChange.fulfilled, (state, action) => {
        state.loading = false;
        state.priceChange = action.payload; // Storing the fetched price change data in the state
      })
      // Handling the rejected state when the fetch request fails
      .addCase(fetchStockPriceChange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default stockSlice.reducer;
