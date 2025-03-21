import { createBrowserRouter } from "react-router-dom";
import App from "../app/App";
import Home from "../pages/Home";
import Company from "../pages/Company";
import StocksAndA from "../pages/StocksAndA";

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
        path: "StocksAndA",
        element: <StocksAndA />,
      },
      {
        path: "Company",
        element: <Company />,
      },
    ],
  },
]);

export default router;
