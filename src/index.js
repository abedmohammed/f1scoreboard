import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { CountriesContextProvider } from "./context/CountriesContext";

import "./sass/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CountriesContextProvider>
      <App />
    </CountriesContextProvider>
  </React.StrictMode>
);
