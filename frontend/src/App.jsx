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
  SignupPage
} from "./routes";
import PageLayout from "./layout/Page.layout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCart } from "./redux/actions/cart";
import { getNewProducts } from "./redux/actions/newProducts";


function App() {
const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart())
    dispatch(getNewProducts())
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

        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
