import { configureStore } from "@reduxjs/toolkit";
import historicalPricesReducer from "../Reducers/historicalPricesSlice";
import keyMetricsReducer from "../Reducers/keyMetricsSlice";
import stockReducer from "../Reducers/AppleSlice"; // Import the stock slice
import newsReducer from "../Reducers/NewsAPISlice";

// Create the Redux store by configuring it with the necessary reducers
const store = configureStore({
  reducer: {
    historicalPrices: historicalPricesReducer, // Reducer for handling historical stock prices state
    keyMetrics: keyMetricsReducer, // Reducer for handling key metrics state
    stock: stockReducer, // Reducer for handling Apple stock data (state for Apple stock)
    news: newsReducer, // Reducer for handling news data (state for fetched news)
  },
});

export default store;
