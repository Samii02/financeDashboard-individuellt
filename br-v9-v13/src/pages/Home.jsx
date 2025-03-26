import AppleStock from "../components/ApplestockChange/AppleStock";
import BusinessNewsSection from "../components/BusinessNews/BusinessNewsSection";
import "../app/App.css";

function Home() {
  return (
    <main className="flex flex-col justify-center items-center bg-primary custom-container">
      <h1 className="opacity-0">Denna sida suckaaaasssss</h1>
      <AppleStock />
      <BusinessNewsSection />
    </main>
  );
}

export default Home;
