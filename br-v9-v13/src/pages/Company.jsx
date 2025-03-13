// pages/Company.jsx
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

  const apiKey = "TLoYbueDL9RUs9JZfiIKmp7uBFSilOzk";
  const apiUrl = "https://financialmodelingprep.com/api/v3/profile/";

  // Hanterar sökningen
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

  // Hämta företagsinformation från API:t
  const fetchCompanyDetails = async (companySymbol) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}${companySymbol}?apikey=${apiKey}`);
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
        alert('Företagsinformation kunde inte hämtas');
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
      alert('Något gick fel när informationen skulle hämtas.');
    } finally {
      setLoading(false);
    }
  };

  // Funktion för att ta bort ett företag
  const removeCompany = (symbol) => {
    setSelectedCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.symbol !== symbol)
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-4xl font-bold mb-6">Nasdaq Company Search</h1>
      <CompanySearchInput
        query={query}
        handleSearch={handleSearch}
        showDropdown={showDropdown}
        filteredCompanies={filteredCompanies}
        fetchCompanyDetails={fetchCompanyDetails}
        setShowDropdown={setShowDropdown}
      />
      
      {/* Loopa genom valda företag och rendera kort för varje */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">        {selectedCompanies.map((company) => (
          <CompanyCard key={company.symbol} company={company} removeCompany={removeCompany} />
        ))}
      </div>
    </div>
  );
}

export default Company;
