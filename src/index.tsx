import React from "react";
import ReactDOM from "react-dom/client"; 

import App from "./App"; 
import { Provider } from "react-redux";
import { store } from "../src/Store/store";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App prop="Geek" />
      </React.StrictMode>
    </Provider>
  );
}
