import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  Header,
  SignupSuccessPage,
  ProductsPage,
  Underconstruction,
  CartPage
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";

export default function App() {
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <>
      {loading ? <h1>Loading</h1> : (
        <BrowserRouter>
          <Routes>
            <Route element={<Header />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup/success" element={<SignupSuccessPage />} />
              <Route path="/activation/:url" element={<ActivationPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<Underconstruction />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      )}
    </>
  );
}
