import CompanyCard from "./CompanyCard";
import { useDispatch } from "react-redux";
import { fetchHistoricalPrices } from "../../Reducers/historicalPricesSlice";

// CompanyList component that renders a list of CompanyCard components
function CompanyList({ companies, removeCompany }) {
  const dispatch = useDispatch();

  // Function to handle clicking on a company and fetch its historical stock prices
  const handleCompanyClick = (symbol) => {
    dispatch(fetchHistoricalPrices(symbol));
  };

  // Section to display all company cards
  return (
    <section className="flex flex-wrap justify-around">
      {companies.map((company) => (
        <CompanyCard
          key={company.symbol}
          company={company}
          removeCompany={removeCompany}
          onCompanyClick={handleCompanyClick}
        />
      ))}
    </section>
  );
}

export default CompanyList;
