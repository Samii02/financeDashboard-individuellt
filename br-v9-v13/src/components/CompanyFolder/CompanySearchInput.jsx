import React from 'react';

function CompanySearchInput({ 
  query, 
  handleSearch, 
  showDropdown, 
  filteredCompanies, 
  fetchCompanyDetails, 
  setShowDropdown, 
  error
}) {
  return (
    <form className="relative w-full max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="company-search" className="sr-only">
        Search for companies
      </label>

      <input
        id="company-search"
        type="text"
        value={query}
        onChange={(e) => {
          handleSearch(e.target.value);
          setShowDropdown(e.target.value.length > 0); // dropdown closes if input is empty
        }}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:outline-none bg-white"
        placeholder="Search here"
        aria-label="Search for companies"
      />
      
      {/* Dropdown */}
      {showDropdown && filteredCompanies.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto z-50 shadow-md">
          {filteredCompanies.map((company) => (
            <li 
              key={company.symbol} 
              onClick={() => {
                fetchCompanyDetails(company.symbol);
                setShowDropdown(false); // Dropdown closes after user choice
              }}
              className="p-3 cursor-pointer hover:bg-blue-100 transition"
            >
              {company.name} ({company.symbol})
            </li>
          ))}
        </ul>
      )}

      {/* error message under input*/}
      {error && (
        <div className="text-red-600 mt-2 text-center">{error}</div>
      )}
    </form>
  );
}

export default CompanySearchInput;
