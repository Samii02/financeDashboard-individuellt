import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = "4VaQvzEdvbD227Udssfv4wn00zgHLV3b";
const key_metrics_url = `https://financialmodelingprep.com/api/v3/key-metrics/AAPL?apikey=${apiKey}`;

// Load data from local storage (if available) for key metrics
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("keyMetrics");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading from local storage:", error);
    return [];
  }
};

const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem("keyMetrics", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
};

// Async thunk for fetching key metrics from the API
export const fetchKeyMetrics = createAsyncThunk(
  "keyMetrics/fetch",
  async () => {
    const response = await fetch(key_metrics_url);
    if (!response.ok) {
      throw new Error("Failed to fetch key metrics");
    }
    const data = await response.json();
    saveToLocalStorage(data);
    return data;
  }
);

// Define the slice for managing the key metrics data in the Redux store
const keyMetricsSlice = createSlice({
  name: "keyMetrics",
  initialState: {
    // Initialize the state with data from local storage or an empty array
    data: loadFromLocalStorage(),
    status: "idle",
    error: null,
  },
  reducers: {}, // No additional reducers are needed in this case
  extraReducers: (builder) => {
    builder
    .addCase(fetchKeyMetrics.pending, (state) => {
      // When the fetch is pending, set the status to 'loading'
      state.status = "loading";
    })
    .addCase(fetchKeyMetrics.fulfilled, (state, action) => {
      // If the fetch is successful, update the state with the fetched data
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(fetchKeyMetrics.rejected, (state, action) => {
      // If the fetch fails, set the status to 'failed' and record the error
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default keyMetricsSlice.reducer;
