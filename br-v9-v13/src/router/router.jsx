import { createBrowserRouter } from "react-router-dom";
import App from "../app/App";
import Home from "../pages/Home";
import Company from "../pages/Company";
import StocksAndAnalyses from "../pages/StocksAndAnalyses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "StocksAndAnalyses",
        element: <StocksAndAnalyses />,
      },
      {
        path: "Company",
        element: <Company />,
      },
    ],
  },
]);

export default router;
