import React from 'react';

function CompanySearchInput({ query, handleSearch, showDropdown, filteredCompanies, fetchCompanyDetails, setShowDropdown }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          handleSearch(e.target.value);
          setShowDropdown(e.target.value.length > 0); //closes dropdown if input is empyty
        }}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Search here"
      />
      
      {/* Dropdown */}
      {showDropdown && filteredCompanies.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto z-50 shadow-md">
          {filteredCompanies.map((company) => (
            <li 
              key={company.symbol} 
              onClick={() => {
                fetchCompanyDetails(company.symbol);
                setShowDropdown(false); // closes dropdown after choice
              }}
              className="p-3 cursor-pointer hover:bg-blue-100 transition"
            >
              {company.name} ({company.symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompanySearchInput;
