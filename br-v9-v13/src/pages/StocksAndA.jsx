import HistoricalPrices from "../components/stocksAndAnalyses/HistoricalPrices";
import FinancialHealthIndicator from "../components/stocksAndAnalyses/FinancialHealthIndicator";
import HistoricalComparisonComponent from "../components/stocksAndAnalyses/HistoricalComparisonComponent";
import "../app/App.css";

function StocksAndA() {
  return (
    <main className="flex flex-col w-full bg-primary custom-container">
      <section className="mt-10 mb-25">
        <HistoricalPrices />
      </section>
      <section className="flex flex-col md:flex-row items-center justify-center mb-15">
        <HistoricalComparisonComponent />
        <FinancialHealthIndicator />
      </section>
    </main>
  );
}
export default StocksAndA;
