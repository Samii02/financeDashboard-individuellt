import React, { useState } from "react";
import StocksModal from "./StocksModal";
import HistoricalPrices from "../stocksAndAnalyses-folder/HistoricalPrices";

// CompanyCard component that displays information about a company
function CompanyCard({ company, removeCompany }) {
  // State to manage whether the modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to limit the description to 100 words for better readability
  const LimitDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 100) {
      return words.slice(0, 100).join(" ") + "...";
    }
    return description;
  };

  // Main card container with styles for responsiveness and interactivity
  return (
    <article
      className="bg-cardBg p-4 mt-15 mb-15 w-3xl shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg font-text text-[14px] md:text-lg lg:text-2xl"
      aria-label="card-containing-company-info"
    >
      <button
        onClick={() => removeCompany(company.symbol)}
        className="absolute top-2 right-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-red-400 transition transform hover:scale-105 shadow-lg"
      >
        <span className="text-lg font-semibold">✕</span>
      </button>

      <h2 className="font-bold font-title text-2xl md:text-3xl lg:text-4xl mb-2">
        {company.companyName}
      </h2>
      <article className="mb-5">
        <h4 className="mb-2">
          <strong>Sector:</strong> {company.sector}
        </h4>
        <h4 className="mb-2">
          <strong>Country:</strong> {company.country}
        </h4>
        <h4 className="mb-2">
          <strong>Market Cap:</strong> ${company.mktCap}
        </h4>
        <h4 className="mb-2">
          <strong>Stock Price:</strong> ${company.price}
        </h4>
      </article>
      <h4>
        <strong>Description:</strong> {LimitDescription(company.description)}
      </h4>
      <img
        src={company.image}
        alt={company.companyName}
        className="mx-auto w-40 sm:w-36 md:w-42 lg:w-50 xl:w-50 mt-4"
        aria-label={company.companyName}
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
