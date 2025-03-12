import { useState } from "react";
import nasdaqCompanies from "../CompanyFolder/CompanyList";

export default function CompanySearch() {
  const [query, setQuery] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const API_KEY = "TLoYbueDL9RUs9JZfiIKmp7uBFSilOzk";

  // function to search in the local list
  const handleSearch = (input) => {
    setQuery(input);
    if (input.length > 0) {
      const results = nasdaqCompanies.filter((company) =>
        company.name.toLowerCase().startsWith(input.toLowerCase()) ||
        company.symbol.toLowerCase().startsWith(input.toLowerCase())
      );
      setFilteredCompanies(results);
      setShowDropdown(results.length > 0);
    } else {
      setFilteredCompanies([]);
      setShowDropdown(false);
    }
  };

  // function to get details from api about company
  const fetchCompanyDetails = async (symbol) => {
    const res = await fetch(
      `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${API_KEY}`
    );
    const data = await res.json();
    setSelectedCompanies((prev) => [...prev, data[0]]);
    setShowDropdown(false);
    setQuery(""); // Rensa inputfältet
    setFilteredCompanies([]); // Rensa listan
  };

  // function to make description limited to 40 words
  const truncateDescription = (description, wordLimit = 40) => {
    const words = description?.split(" ") || [];
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : description;
  };

  return (
    <section className="p-4 max-w-3xl mx-auto">
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold">Search for a NASDAQ company!</h1>
      </header>

      <section className="relative flex gap-2 justify-center">
        <input
          type="text"
          placeholder="Enter here!"
          className="w-full p-2 border rounded-md"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowDropdown(filteredCompanies.length > 0)}
        />

        {/* dropdown with companies */}
        {showDropdown && filteredCompanies.length > 0 && (
          <ul className="absolute left-0 top-full w-full bg-white border rounded-md mt-1 shadow-lg">
            {filteredCompanies.map((company) => (
              <li
                key={company.symbol}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => fetchCompanyDetails(company.symbol)}
              >
                {company.name} ({company.symbol})
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* facecard for shown companies */}
      <section className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {selectedCompanies.map((company) => (
          <article
            key={company.symbol}
            className="p-4 border rounded-lg shadow-md bg-white w-full"
          >
            <h2 className="text-xl font-bold mb-2">{company.companyName}</h2>
            <p><strong>Sector:</strong> {company.industry}</p>
            <p><strong>Country:</strong> {company.country}</p>
            <p><strong>Market Cap:</strong> ${company.mktCap}</p>
            <p><strong>Stock Price:</strong> ${company.price}</p>
            <p><strong>Description:</strong> {truncateDescription(company.description, 40)}</p>
            <img src={company.image} alt={company.companyName} className="w-full h-auto mt-4" />
          </article>
        ))}
      </section>
    </section>
  );
}
