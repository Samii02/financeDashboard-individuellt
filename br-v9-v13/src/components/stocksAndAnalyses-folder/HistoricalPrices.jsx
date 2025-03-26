import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHistoricalPrices } from "../../Reducers/historicalPricesSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function HistoricalPrices({ symbol = "AAPL" }) {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector(
    (state) => state.historicalPrices
  );

  useEffect(() => {
    if (!data || data.length === 0 || (symbol && symbol !== data.symbol)) {
      dispatch(fetchHistoricalPrices(symbol));
    }
  }, [dispatch, symbol]);

  if (status === "loading")
    return <p className="font-text">Loading historical prices...</p>;
  if (status === "failed")
    return <p className="text-center font-text m-25">Error: {error}</p>;

  return (
    <section className="flex items-center justify-center flex-col w-full">
      {data?.historical ? (
        <section className="flex justify-center w-11/12 pt-5 h-[425px] bg-cardBg rounded-lg shadow-lg">
          <ResponsiveContainer width="90%" height={400}>
            <LineChart
              data={[...data.historical]
                .filter((item) => new Date(item.date).getFullYear() >= 2000)
                .reverse()
                .filter((_, index) => index % 5 === 0)}
            >
              <CartesianGrid strokeDasharray="3 3" />
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
              <YAxis tick={{ fontFamily: "tahoma", fontSize: 16 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontFamily: "tahoma", paddingTop: 20 }} />
              <Line
                type="linear"
                dataKey="close"
                stroke="#2f21a7"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      ) : (
        <p>No data available</p>
      )}
    </section>
  );
}

export default HistoricalPrices;
