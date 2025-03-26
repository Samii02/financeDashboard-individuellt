import React, { useState } from "react";
import CompanySearchInput from "../components/CompanyFolder/CompanySearchInput";
import CompanyList from "../components/CompanyFolder/CompanyList";
import nasdaqCompanies from "../components/CompanyFolder/NasdaqCompanies";
import "../app/App.css";

function Company() {
  // State variables for managing the search query, selected companies, filtered results, and error messages
  const [query, setQuery] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [error, setError] = useState("");

  const apiKey = "TLoYbueDL9RUs9JZfiIKmp7uBFSilOzk";
  const apiUrl = "https://financialmodelingprep.com/api/v3/profile/";

  // Handle search input and filter the companies based on the query
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);

    // If there's a search query, filter companies from the static list (nasdaqCompanies)
    if (searchQuery) {
      const filtered = nasdaqCompanies.filter(
        (company) =>
          company.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          company.symbol.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setFilteredCompanies(filtered); // Update the filtered companies
      setShowDropdown(filtered.length > 0); // Show dropdown if there are matching results
    } else {
      setFilteredCompanies([]);
      setShowDropdown(false);
    }
  };

  // Fetch company details from the API based on the selected company symbol
  const fetchCompanyDetails = async (companySymbol) => {
    setError(""); // Reset previous error messages
    try {
      // Make a fetch request to get the company details using the API URL and symbol
      const response = await fetch(
        `${apiUrl}${companySymbol}?apikey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // If company data is available, add it to the selected companies list
      if (data && data.length > 0) {
        const companyData = data[0];

        // Check if the company is already in the selected list to avoid duplicates
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
      // Catch any network or API-related errors
      console.error("Error fetching company data:", error);
      setError("Something went wrong. Try again later.");
    }
  };

  // Remove a company from the selected companies list by its symbol
  const removeCompany = (symbol) => {
    setSelectedCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.symbol !== symbol)
    );
  };

  return (
    <main className="w-full min-h-screen p-4 bg-primary custom-container">
      <header className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-title">
          Nasdaq Company Search
        </h1>
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
