import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, SignupPage, ActivationPage } from "./Routes.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="/activation/:url" element={<ActivationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
