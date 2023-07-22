import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./redux/store.js";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.render(
  <ThemeProvider>
    <Provider store={Store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
