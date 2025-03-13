import React from 'react';

function CompanyCard({ company, removeCompany }) {
  
  // function to limit description to 100 word and adds ... if its more than 100 words.
  const LimitDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 100) {
      return words.slice(0, 100).join(' ') + '...';
    }
    return description; 
  };

  return (
    <article className="relative flex-basis-[250px] bg-white p-4 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg mt-10 mb-10 mr-2">
      {/* close button */}
      <button
  onClick={() => removeCompany(company.symbol)}
  className="absolute top-2 right-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-red-400 transition transform hover:scale-110 shadow-lg"
>
  <span className="text-lg font-semibold">✕</span>
</button>


      <h2 className="text-xl font-bold mb-2">{company.companyName}</h2>
      <p><strong>Sector:</strong> {company.sector}</p>
      <p><strong>Country:</strong> {company.country}</p>
      <p><strong>Market Cap:</strong> ${company.mktCap}</p>
      <p><strong>Stock Price:</strong> ${company.price}</p>
      <p><strong>Description:</strong> {LimitDescription(company.description)}</p>
      <img
        src={company.image}
        alt={company.companyName}
        className="mx-auto w-40 sm:w-36 md:w-42 lg:w-50 xl:w-50 mt-4"
      />
    </article>
  );
}

export default CompanyCard;
