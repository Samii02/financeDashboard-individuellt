import React from 'react';

function CompanyCard({ company, removeCompany }) {
  
  // Funktion som begränsar beskrivningen till 100 ord
  const LimitDescription = (description) => {
    // Dela upp beskrivningen i ord och begränsa till 100 ord
    const words = description.split(' ');
    if (words.length > 100) {
      return words.slice(0, 100).join(' ') + '...'; // Om mer än 100 ord, lägg till "..."
    }
    return description; // Om mindre än eller lika med 100 ord, visa hela beskrivningen
  };

  return (
    <div className="relative flex-basis-[250px] bg-white p-4 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg mt-10">
      {/* Stäng-knapp */}
      <button
        onClick={() => removeCompany(company.symbol)}
        className="absolute top-2 right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold mb-2">{company.companyName}</h2>
      <p><strong>Sector:</strong> {company.sector}</p>
      <p><strong>Country:</strong> {company.country}</p>
      <p><strong>Market Cap:</strong> ${company.mktCap}</p>
      <p><strong>Stock Price:</strong> ${company.price}</p>
      
      {/* Kort beskrivning med max 100 ord */}
      <p><strong>Description:</strong> {LimitDescription(company.description)}</p>

      {/* Företagsbild */}
      <img
        src={company.image}
        alt={company.companyName}
        className="mx-auto w-40 sm:w-36 md:w-42 lg:w-50 xl:w-50 mt-4"
      />
    </div>
  );
}

export default CompanyCard;
