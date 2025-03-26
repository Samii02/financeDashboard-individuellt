import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-secondary text-white py-4 text-xs md:text-[16px] lg:text-xl">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Grid Layout för footer-sektioner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-text">
          {/* Shortcuts Section */}
          <article className="flex flex-col">
            <h4 className="text-lg font-semibold mb-2">Shortcuts</h4>
            <Link
              to="/"
              className="footerLink mb-2 pl-1.5 pr-1.5 w-fit border-2 border-transparent hover:border-accent rounded-md duration-300 hover:shadow-lg"
            >
              Home
            </Link>
            <Link
              to="StocksAndAnalyses"
              className="footerLink mb-2 pl-1.5 pr-1.5 w-fit border-2 border-transparent hover:border-accent rounded-md duration-300 hover:shadow-lg"
            >
              Stocks And Analyses
            </Link>
            <Link
              to="Company"
              className="footerLink mb-2 pl-1.5 pr-1.5 w-fit border-2 border-transparent hover:border-accent rounded-md duration-300 hover:shadow-lg"
            >
              Company
            </Link>
          </article>
          {/* GitHub Links Section */}
          <article className="flex flex-col">
            <h4 className="text-lg font-semibold mb-2 flex items-center">
              <img
                className="w-6 h-6 mr-2"
                src="/Icons/links-light/Github.png"
                alt="Git icon"
              />
              Github
            </h4>
            <a
              href="https://github.com/Albin-Tenghagen"
              target="_blank"
              rel="noopener noreferrer"
              className="footerLink mb-2 pl-1.5 pr-1.5 w-fit border-2 border-transparent hover:border-accent rounded-md duration-300 hover:shadow-lg"
            >
              Albin
            </a>
            <a
              href="https://github.com/ThaisonL"
              target="_blank"
              rel="noopener noreferrer"
              className="footerLink mb-2 pl-1.5 pr-1.5 w-fit border-2 border-transparent hover:border-accent rounded-md duration-300 hover:shadow-lg"
            >
              Phi-Thai
            </a>
            <a
              href="https://github.com/Samii02"
              target="_blank"
              rel="noopener noreferrer"
              className="footerLink mb-2 pl-1.5 pr-1.5 w-fit border-2 border-transparent hover:border-accent rounded-md duration-300 hover:shadow-lg"
            >
              Sami
            </a>
          </article>
          {/* LinkedIn Links Section */}
          <article className="flex flex-col">
            <h4 className="text-lg font-semibold mb-2 flex items-center">
              <img
                className="w-6 h-6 mr-2"
                src="/Icons/links-light/Linkedin.png"
                alt="Linkedin icon"
              />
              Linkedin
            </h4>
            <a
              href="https://www.linkedin.com/in/albin-tenghagen-980685211/"
              target="_blank"
              rel="noopener noreferrer"
              className="footerLink mb-2 pl-1.5 pr-1.5 w-fit border-2 border-transparent hover:border-accent rounded-md duration-300 hover:shadow-lg"
            >
              Albin
            </a>
            <a
              href="https://www.linkedin.com/in/phi-thai-lai-299968330/"
              target="_blank"
              rel="noopener noreferrer"
              className="footerLink mb-2 pl-1.5 pr-1.5 w-fit border-2 border-transparent hover:border-accent rounded-md duration-300 hover:shadow-lg"
            >
              Phi-Thai
            </a>
            <a
              href="https://www.linkedin.com/in/sami-al-halabi-1aab76329/"
              target="_blank"
              rel="noopener noreferrer"
              className="footerLink mb-2 pl-1.5 pr-1.5 w-fit border-2 border-transparent hover:border-accent rounded-md duration-300 hover:shadow-lg"
            >
              Sami
            </a>
          </article>
          {/* Trademark Section */}
          <article className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-2">Trademark</h4>
            <p className="footerLink mb-2 pl-1.5 pr-1.5 w-fit border-2 border-transparent hover:border-accent rounded-md duration-300 hover:shadow-lg cursor-pointer">
              Trady Lady
            </p>
            <p className="footerLink mb-2 pl-1.5 pr-1.5 w-fit border-2 border-transparent hover:border-accent rounded-md duration-300 hover:shadow-lg cursor-pointer">
              Owns our soul
            </p>
            <p className="footerLink mb-2 pl-1.5 pr-1.5 w-fit border-2 border-transparent hover:border-accent rounded-md duration-300 hover:shadow-lg cursor-pointer">
              © {currentYear}
            </p>
          </article>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
