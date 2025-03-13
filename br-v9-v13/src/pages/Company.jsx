import React, { useState } from 'react';
import CompanySearchInput from '../components/CompanyFolder/CompanySearchInput';
import CompanyCard from '../components/CompanyFolder/CompanyCard';
import nasdaqCompanies from '../components/CompanyFolder/NasdaqCompanies';

function Company() {
  const [query, setQuery] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');  // Handle error messages

  const apiKey = "TLoYbueDL9RUs9JZfiIKmp7uBFSilOzk";
  const apiUrl = "https://financialmodelingprep.com/api/v3/profile/";

  // Search function
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);

    if (searchQuery) {
      const filtered = nasdaqCompanies.filter((company) =>
        company.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        company.symbol.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setFilteredCompanies(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setFilteredCompanies([]);
      setShowDropdown(false);
    }
  };

  // Fetch company details via API
  const fetchCompanyDetails = async (companySymbol) => {
    setLoading(true);
    setError('');  // Reset previous error messages
    try {
      const response = await fetch(`${apiUrl}${companySymbol}?apikey=${apiKey}`);
      
      // Check if the response from API is not ok
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const companyData = data[0];
        
        setSelectedCompanies((prevCompanies) => {
          if (!prevCompanies.some((company) => company.symbol === companyData.symbol)) {
            return [...prevCompanies, companyData];
          }
          return prevCompanies;
        });
  
        setQuery('');
        setShowDropdown(false);
      } else {
        setError('No company details found for the given symbol');
      }
    } catch (error) {
      // Catch both network errors and other API-related issues
      console.error('Error fetching company data:', error);
      setError('Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Remove company from selected list
  const removeCompany = (symbol) => {
    setSelectedCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.symbol !== symbol)
    );
  };

  return (
    <main className="w-full min-h-screen p-4 bg-[#faebd7]">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold">Nasdaq Company Search</h1>
      </header>

      <section>
        <CompanySearchInput
          query={query}
          handleSearch={handleSearch}
          showDropdown={showDropdown}
          filteredCompanies={filteredCompanies}
          fetchCompanyDetails={fetchCompanyDetails}
          setShowDropdown={setShowDropdown}
          error={error}  // Pass the error message to CompanySearchInput
        />
      </section>

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Loop through selected companies and render a card */}
        {selectedCompanies.map((company) => (
          <CompanyCard key={company.symbol} company={company} removeCompany={removeCompany} />
        ))}
      </section>
    </main>
  );
}

export default Company;
