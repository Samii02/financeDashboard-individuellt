import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import store from "./store/store";
import { Provider } from "react-redux";

// Create the root element for the app and render the components
createRoot(document.getElementById("root")).render(
  // The root of the app is wrapped with the Provider to enable Redux state management
  <Provider store={store}>
    {/* RouterProvider is responsible for handling the routing logic */}
    <RouterProvider router={router} />
  </Provider>
);
