import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthContext from "./Context/AuthContext";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContext>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </AuthContext>
  </React.StrictMode>
);

reportWebVitals();
