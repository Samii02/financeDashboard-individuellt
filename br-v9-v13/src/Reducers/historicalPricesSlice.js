import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = "4VaQvzEdvbD227Udssfv4wn00zgHLV3b";

// Define an asynchronous thunk to fetch historical prices for a specific company
export const fetchHistoricalPrices = createAsyncThunk(
  "historicalPrices/fetch",
  async (symbol = "AAPL") => { // Default to 'AAPL' if no symbol is provided
    const historical_prices_url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=2000-01-01&serietype=line&apikey=${apiKey}`;
    const response = await fetch(historical_prices_url);
    if (!response.ok) {
      throw new Error("Failed to fetch historical prices");
    }
    const data = await response.json();
    console.log("Fetched Data:", data);
    return data;
  }
);

// Create a slice of the Redux store to manage historical prices data
const historicalPricesSlice = createSlice({
  name: "historicalPrices",
  initialState: {
    data: [], // Initial state for the historical prices (empty array)
    symbol: null, // No symbol selected initially
    status: "idle", // Initial status (idle means no current action is being performed)
    error: null, // No error initially
  },
  reducers: {}, // No additional reducers (actions) defined in this slice
  extraReducers: (builder) => {
    builder
    // Handle the "pending" state of the async thunk (loading state)
      .addCase(fetchHistoricalPrices.pending, (state) => {
        state.status = "loading";
      })
      // Handle the "fulfilled" state of the async thunk (success state)
      .addCase(fetchHistoricalPrices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.symbol = action.meta.arg;
      })
      // Handle the "rejected" state of the async thunk (failure state)
      .addCase(fetchHistoricalPrices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default historicalPricesSlice.reducer;
