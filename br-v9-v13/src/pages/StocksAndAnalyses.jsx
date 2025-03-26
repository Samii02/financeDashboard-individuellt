import HistoricalPrices from "../components/stocksAndAnalyses-folder/HistoricalPrices";
import FinancialHealthIndicator from "../components/stocksAndAnalyses-folder/FinancialHealthIndicator";
import HistoricalComparisonComponent from "../components/stocksAndAnalyses-folder/HistoricalComparisonComponent";
import "../app/App.css";

// Main component to render the Stocks and Analyses section
function stocksAndAnalyses() {
  return (
    <main className="flex flex-col w-full bg-primary custom-container">
      <section className="mt-10 mb-25">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mt-1 mb-6.5 font-title ml-5 md:ml-0">
          Apples stock worth in $ since the turn of the century
        </h2>
        <HistoricalPrices />
      </section>
      <section className="flex flex-col md:flex-row items-center justify-center mb-15">
        <HistoricalComparisonComponent />
        <FinancialHealthIndicator />
      </section>
    </main>
  );
}
export default stocksAndAnalyses;
