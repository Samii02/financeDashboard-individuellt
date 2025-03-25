import React, { useState } from "react";
import CompanySearchInput from "../components/CompanyFolder/CompanySearchInput";
import CompanyList from "../components/CompanyFolder/CompanyList";
import nasdaqCompanies from "../components/CompanyFolder/NasdaqCompanies";
import "../app/App.css";

function Company() {
  const [query, setQuery] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [error, setError] = useState("");

  const apiKey = "TLoYbueDL9RUs9JZfiIKmp7uBFSilOzk";
  const apiUrl = "https://financialmodelingprep.com/api/v3/profile/";

  // Search function
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);

    if (searchQuery) {
      const filtered = nasdaqCompanies.filter(
        (company) =>
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
    setError(""); // Reset previous error messages
    try {
      const response = await fetch(
        `${apiUrl}${companySymbol}?apikey=${apiKey}`
      );

      // Check if the response from API is not ok
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const companyData = data[0];

        setSelectedCompanies((prevCompanies) => {
          if (
            !prevCompanies.some(
              (company) => company.symbol === companyData.symbol
            )
          ) {
            return [...prevCompanies, companyData];
          }
          return prevCompanies;
        });

        setQuery("");
        setShowDropdown(false);
      } else {
        setError("No company details found for the current search, try again");
      }
    } catch (error) {
      // Catch both network errors and other API-related issues
      console.error("Error fetching company data:", error);
      setError("Something went wrong. Try again later.");
    }
  };

  // Remove company from selected list
  const removeCompany = (symbol) => {
    setSelectedCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.symbol !== symbol)
    );
  };

  return (
    <main className="w-full min-h-screen p-4 bg-primary custom-container">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold font-title">Nasdaq Company Search</h1>
      </header>

      <section>
        <CompanySearchInput
          query={query}
          handleSearch={handleSearch}
          showDropdown={showDropdown}
          filteredCompanies={filteredCompanies}
          fetchCompanyDetails={fetchCompanyDetails}
          setShowDropdown={setShowDropdown}
          error={error}
        />
      </section>

      <CompanyList
        companies={selectedCompanies}
        removeCompany={removeCompany}
      />
    </main>
  );
}

export default Company;
