import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SettingsProvider from "./Contexts/SettingsContext";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <div className="App">
    <React.StrictMode>
      <ReduxProvider store={store}>
        <SettingsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SettingsProvider>
      </ReduxProvider>
    </React.StrictMode>
  </div>
);
