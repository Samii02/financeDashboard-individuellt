import { useState, useEffect } from "react";

const API_KEY = "TLoYbueDL9RUs9JZfiIKmp7uBFSilOzk";

export default function CompanySearch() {
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // en live sökning som fetchar efter användarens input
  useEffect(() => {
    const fetchCompanies = async () => {
      if (query.length > 0) {
        const res = await fetch(
          `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=5&exchange=NASDAQ&apikey=${API_KEY}`
        );
        const data = await res.json();
        setCompanies(data);
        setShowDropdown(data.length > 0);
      } else {
        setCompanies([]);
        setShowDropdown(false);
      }
    };
    
    const delayDebounce = setTimeout(fetchCompanies, 500); // Minskar API-anrop väntar in en halv sekund tills användaren slutat skriva och fetchar

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Hämta detaljer för valt bolag
  const fetchCompanyDetails = async (symbol) => {
    const res = await fetch(
      `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${API_KEY}`
    );
    const data = await res.json();
    setSelectedCompany(data[0]);
    setShowDropdown(false);
    setQuery(""); // Rensa input
    setCompanies([]); // Rensa lista
  };

  return (
    <section className="p-4 max-w-3xl mx-auto">
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold">Search for a company!</h1>
      </header>

      <section className="relative flex gap-2 justify-center">
        <input
          type="text"
          placeholder="Enter here!"
          className="w-full p-2 border rounded-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(companies.length > 0)}
        />

        {/* Dropmeny med bolag */}
        {showDropdown && companies.length > 0 && (
          <ul className="absolute left-0 top-full w-full bg-white border rounded-md mt-1 shadow-lg">
            {companies.map((company) => (
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

      {/* Företagsdetaljer */}
      {selectedCompany && (
        <article className="mt-6 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-bold mb-2">{selectedCompany.companyName}</h2>
          <p><strong>Sector:</strong> {selectedCompany.industry}</p>
          <p><strong>Country:</strong> {selectedCompany.country}</p>
          <p><strong>Market Cap:</strong> ${selectedCompany.mktCap}</p>
          <p><strong>Stock Price:</strong> ${selectedCompany.price}</p>
          <p><strong>Description:</strong> {selectedCompany.description}</p>
        </article>
      )}
    </section>
  );
}
