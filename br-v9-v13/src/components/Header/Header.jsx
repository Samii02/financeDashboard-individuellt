import Navbar from "../Navbar/Navbar";
function Header() {
  return (
    <header className="w-full h-28 flex flex-col md:flex-row bg-secondary items-center justify-between">
      <h1 className="text-4xl md:text-5xl text-white ml-2 ">Apple Dashboard</h1>
      <Navbar />
    </header>
  );
}
export default Header;
