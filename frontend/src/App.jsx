import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  ShopPage,
  ShopMenPage,
  ShopWomenPage,
  ShopCategoryPage,
  ProductSearchPage,
  ProductDetailsPage,
  CartPage,
  CheckoutPage,
  LoginPage,
  SignupPage,
  AccountPage,
  AccountSettings,
  Address,
  History,
  SaveItems,
  Orders,
} from "./routes";
import PageLayout from "./layout/Page.layout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCart } from "./redux/actions/cart";
import { getNewProducts } from "./redux/actions/newProducts";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
    dispatch(getNewProducts());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/men" element={<ShopMenPage />} />
          <Route path="/women" element={<ShopWomenPage />} />
          <Route path="/category/:name" element={<ShopCategoryPage />} />
          <Route path="/product" element={<ProductSearchPage />} />
          <Route path="/product/:name" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* User account */}
          <Route path="/my-account" element={<AccountPage />}>
            <Route index element={<h1>HELO</h1>} />

            <Route path="settings" element={<AccountSettings />} />
            <Route path="orders" element={<Orders />} />
            <Route path="addresses" element={<Address />} />
            <Route path="history" element={<History />} />
            <Route path="save-to-later" element={<SaveItems />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
