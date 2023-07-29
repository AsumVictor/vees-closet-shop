import React, { useEffect, useState } from "react";
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
  CheckoutPage,
} from "./Routes";
import { ShopLoginPage, ShopAddProductPage } from "./ShopRoutes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store.js";
import { loadUser, loadShop } from "./redux/actions/user";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import ShopProtected from "./shopProtectedRoutes";
import Layout from "./ShopPages/layout/layout";
import { getAllProducts } from "./redux/actions/product";
export default function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadShop());
    Store.dispatch(getAllProducts());
  }, []);

  return (
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
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/shop/login" element={<ShopLoginPage />} />
        {/* Shop routes */}
        <Route element={<ShopProtected />}>
          <Route path="shop" element={<Layout />}>
            <Route path="add-product" element={<ShopAddProductPage />} />
          </Route>
        </Route>
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
        theme="light"
      />
    </BrowserRouter>
  );
}
