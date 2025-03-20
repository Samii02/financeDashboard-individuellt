import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockPriceChange } from "../../Reducers/AppleSlice";

const AppleStock = () => {
  const dispatch = useDispatch();
  const { priceChange, loading, error } = useSelector((state) => state.stock);

  useEffect(() => {
    dispatch(fetchStockPriceChange());
  }, []);

  const getIndicatorColor = (value) => {
    if (value > 0) return "text-green-500";
    if (value < 0) return "text-red-500";
    return "text-yellow500";
  };
  // Logging priceChange to see what it contains
  console.log("Apple stock", priceChange);
  // Add defensive checks before accessing the priceChange data
  if (loading) return <p>Loading AAPL price change...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!priceChange || Object.keys(priceChange).length === 0) {
    return <p>No price change data available.</p>;
  }

  return (
    <section className=" w-11/12 flex flex-col mt-7 mb-7 p-3.5 justify-center items-center box-content shadow-lg bg-cardBg rounded-md">
      <h2 className=" font-bold text-3xl md:text-4xl lg:text-5xl justify-center items-center">
        AAPL Stock Price Change over time
      </h2>

      <ul className="flex flex-row flex-wrap m-2 p-2 gap-1 justify-center items-center">
        <li className="rounded-2xl">
          1 Day:{" "}
          <span className={getIndicatorColor(priceChange["1D"])}>
            {priceChange?.["1D"] ?? "N/A"}%
          </span>
        </li>
        <li className="rounded-2xl">
          5 Day:{" "}
          <span className={getIndicatorColor(priceChange["5D"])}>
            {priceChange?.["5D"] ?? "N/A"}%
          </span>
        </li>
      </ul>

      <ul className="flex flex-row flex-wrap m-2 p-2 gap-1 justify-center items-center">
        <li className="rounded-2xl">
          1 Month:{" "}
          <span className={getIndicatorColor(priceChange["1M"])}>
            {priceChange?.["1M"] ?? "N/A"}%
          </span>
        </li>
        <li className="rounded-2xl">
          3 Months:{" "}
          <span className={getIndicatorColor(priceChange["3M"])}>
            {priceChange?.["3M"] ?? "N/A"}%
          </span>
        </li>
        <li className="rounded-2xl">
          6 Months:{" "}
          <span className={getIndicatorColor(priceChange["6M"])}>
            {priceChange?.["6M"] ?? "N/A"}%
          </span>
        </li>
      </ul>

      <ul className="flex flex-row flex-wrap m-2 p-2 gap-1 justify-center items-center">
        <li className="rounded-2xl">
          Year to Date:{" "}
          <span className={getIndicatorColor(priceChange["ytd"])}>
            {priceChange?.["ytd"] ?? "N/A"}%
          </span>
        </li>
        <li className="rounded-2xl">
          1 Year:{" "}
          <span className={getIndicatorColor(priceChange["1Y"])}>
            {priceChange?.["1Y"] ?? "N/A"}%
          </span>
        </li>
        <li className="rounded-2xl">
          3 Years:{" "}
          <span className={getIndicatorColor(priceChange["3Y"])}>
            {priceChange?.["3Y"] ?? "N/A"}%
          </span>
        </li>
        <li className="rounded-2xl">
          5 Year:{" "}
          <span className={getIndicatorColor(priceChange["5Y"])}>
            {priceChange?.["5Y"] ?? "N/A"}%
          </span>
        </li>
        <li className="rounded-2xl">
          10 Years:{" "}
          <span className={getIndicatorColor(priceChange["10Y"])}>
            {priceChange?.["10Y"] ?? "N/A"}%
          </span>
        </li>
      </ul>
    </section>
  );
};

export default AppleStock;
