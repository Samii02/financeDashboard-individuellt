import CompanyCard from "./CompanyCard";
import { useDispatch } from "react-redux";
import { fetchHistoricalPrices } from "../../Reducers/historicalPricesSlice";

function CompanyList({ companies, removeCompany }) {
  const dispatch = useDispatch();

  const handleCompanyClick = (symbol) => {
    dispatch(fetchHistoricalPrices(symbol));
  };

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
