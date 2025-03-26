import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchKeyMetrics } from "../../Reducers/keyMetricsSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts"; //* Importing chart components from Recharts

function HistoricalComparisonComponent() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.keyMetrics);
  const [selectedMetric, setSelectedMetric] = useState("currentRatio"); // State to store the selected financial metric

  useEffect(() => {
    dispatch(fetchKeyMetrics()); // Fetch financial metrics when component mounts
  }, [dispatch]);

  // Handle different loading and error states
  if (status === "loading")
    return <p className="font-text">Loading historical data...</p>;
  if (status === "failed") return <p className="font-text">Error: {error}</p>;
  if (!data || data.length === 0)
    return <p className="font-text">No historical data available</p>;

  // Benchmark values for financial metrics
  const benchmarks = {
    currentRatio: 1.5,
    debtToEquity: 1.0,
    roe: 0.15,
    netDebtToEBITDA: 2.0,
    earningsYield: 0.05,
    freeCashFlowYield: 0.05,
  };

  // User-friendly names for the financial metrics
  const metricNames = {
    currentRatio: "Current Ratio",
    debtToEquity: "Debt to Equity",
    roe: "Return on Equity (ROE)",
    netDebtToEBITDA: "Net Debt to EBITDA",
    earningsYield: "Earnings Yield",
    freeCashFlowYield: "Free Cash Flow Yield",
  };

  // Transforming API data to be compatible with Recharts
  const historicalData = data
    .map((item) => ({
      date: item.date, // Extracting date from each data entry
      value: item[selectedMetric], // Extracting the selected financial metric
    }))
    .reverse(); //* Reversing the data order to show recent dates last

  // Return the JSX structure for displaying the grapf with the help of recharts syntax
  return (
    <section className="flex flex-col items-center w-full max-w-2xl">
      <h2 className="text-m lg:text-3xl font-bold font-title">
        Comparison of Financial Metrics
      </h2>
      {/* Dropdown to select financial metric */}
      <select
        className="mt-4 mb-4 p-2 border rounded text-[14px] bg-cardBg transform transition-transform duration-300 hover:scale-105 font-text"
        value={selectedMetric}
        onChange={(e) => setSelectedMetric(e.target.value)}
      >
        {Object.keys(benchmarks).map((metric) => (
          <option key={metric} value={metric}>
            {metricNames[metric]}
          </option>
        ))}
      </select>
      {/* Chart section */}
      <section
        className="flex justify-center w-11/12 pt-5 h-[420px] bg-cardBg rounded-lg shadow-lg"
        aria-label="graph-key-metrics"
      >
        <ResponsiveContainer width="90%" height={400}>
          <LineChart
            data={historicalData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* X-Axis configuration */}
            <XAxis
              dataKey="date"
              interval="preserveStartEnd"
              tick={{
                angle: -25,
                dx: -5,
                dy: 10,
                fontFamily: "tahoma",
                fontSize: 15,
              }}
              tickFormatter={(date) => {
                const parsedDate = new Date(date);
                return parsedDate.toLocaleDateString("en-US", {
                  year: "2-digit",
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            {/* Y-Axis configuration */}
            <YAxis
              domain={
                selectedMetric.includes("Yield")
                  ? [0, 0.1]
                  : [0, (dataMax) => Math.ceil(dataMax * 1.1)]
              }
              tickCount={8}
              tick={{ fontFamily: "tahoma", fontSize: 16 }}
              allowDecimals={true}
              scale="linear"
              tickFormatter={(value) => Number(value.toPrecision(4))}
            />

            <Tooltip />
            <Legend wrapperStyle={{ fontFamily: "tahoma", paddingTop: 25 }} />
            {/* Reference line for benchmark value */}
            <ReferenceLine
              y={benchmarks[selectedMetric]}
              stroke="red"
              strokeWidth={2}
            />
            {/* Line chart for financial metric */}
            <Line
              type="linear"
              dataKey="value"
              stroke="#2f21a7"
              strokeWidth={2}
            />
            {/* Additional line for benchmark */}
            <Line type="basis" dataKey="Benchmark" stroke="#dd0000" />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </section>
  );
}

export default HistoricalComparisonComponent;
