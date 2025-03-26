import { createBrowserRouter } from "react-router-dom";
import App from "../app/App";
import Home from "../pages/Home";
import Company from "../pages/Company";
import StocksAndAnalyses from "../pages/StocksAndAnalyses";

// Create a router using React Router's createBrowserRouter function
const router = createBrowserRouter([
  {
    path: "/", // Root path for the application
    element: <App />, // The App component will be rendered for the root path
    children: [
      {
        index: true, // The index route, rendered when the path is exactly "/"
        element: <Home />, // Renders the Home component for the index route
      },

      {
        path: "StocksAndAnalyses", // Path for the "StocksAndAnalyses" route
        element: <StocksAndAnalyses />, // Renders the StocksAndAnalyses component for this route
      },
      {
        path: "Company", // Path for the "Company" route
        element: <Company />, // Renders the Company component for this route
      },
    ],
  },
]);

export default router;
