import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import { CountryInfo, Main } from "./pages";
import App from "./App.tsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path=":countryCode" element={<CountryInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);
