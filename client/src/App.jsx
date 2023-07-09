import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Signup } from "./Routes.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
