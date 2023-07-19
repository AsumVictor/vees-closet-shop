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
  CartPage,
  ProductDetailPage,
  WishListPage,
  ProfilePage,
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route element={<Header />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup/success" element={<SignupSuccessPage />} />
              <Route path="/activation/:url" element={<ActivationPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:name" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/saved-to-later" element={<WishListPage />} />
              <Route path="*" element={<Underconstruction />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
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
