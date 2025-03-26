import React, { useState } from "react";
import StocksModal from "./StocksModal";
import HistoricalPrices from "../stocksAndAnalyses-folder/HistoricalPrices";

function CompanyCard({ company, removeCompany }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const LimitDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 100) {
      return words.slice(0, 100).join(" ") + "...";
    }
    return description;
  };

  return (
    <article className="bg-cardBg p-4 mt-15 mb-15 w-3xl shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg font-text text-[14px] md:text-lg lg:text-2xl">
      <button
        onClick={() => removeCompany(company.symbol)}
        className="absolute top-2 right-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-red-400 transition transform hover:scale-105 shadow-lg"
      >
        <span className="text-lg font-semibold">✕</span>
      </button>

      <h2 className="font-bold font-title text-2xl md:text-3xl lg:text-4xl mb-2">
        {company.companyName}
      </h2>
      <p>
        <strong>Sector:</strong> {company.sector}
      </p>
      <p>
        <strong>Country:</strong> {company.country}
      </p>
      <p>
        <strong>Market Cap:</strong> ${company.mktCap}
      </p>
      <p className="mb-3">
        <strong>Stock Price:</strong> ${company.price}
      </p>
      <p>
        <strong>Description:</strong> {LimitDescription(company.description)}
      </p>
      <img
        src={company.image}
        alt={company.companyName}
        className="mx-auto w-40 sm:w-36 md:w-42 lg:w-50 xl:w-50 mt-4"
      />

      <button
        className="mt-4 bg-secondary hover:bg-[#79918D] text-white px-4 py-2 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Show Historical Prices
      </button>

      <StocksModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <HistoricalPrices symbol={company.symbol} />
      </StocksModal>
    </article>
  );
}

export default CompanyCard;
