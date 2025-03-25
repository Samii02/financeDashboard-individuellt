import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = "4VaQvzEdvbD227Udssfv4wn00zgHLV3b";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("historicalPrices");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading from local storage:", error);
    return [];
  }
};

const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem("historicalPrices", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
};

// Fetch historical prices for a specific company
export const fetchHistoricalPrices = createAsyncThunk(
  "historicalPrices/fetch",
  async (symbol = "AAPL") => {
    const historical_prices_url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=2000-01-01&serietype=line&apikey=${apiKey}`;
    const response = await fetch(historical_prices_url);
    if (!response.ok) {
      throw new Error("Failed to fetch historical prices");
    }
    const data = await response.json();
    console.log("Fetched Data:", data);
    saveToLocalStorage(data);
    return data;
  }
);


const historicalPricesSlice = createSlice({
  name: "historicalPrices",
  initialState: {
    data: loadFromLocalStorage(),
    symbol: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoricalPrices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHistoricalPrices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.symbol = action.meta.arg;
      })
      .addCase(fetchHistoricalPrices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export default historicalPricesSlice.reducer;
