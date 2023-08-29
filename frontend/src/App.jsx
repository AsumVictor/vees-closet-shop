import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  ShopPage,
  ShopMenPage,
  ShopWomenPage,
  ShopCategoryPage,
  ProductSearchPage,
  ProductDetailsPage,
  CartPage
} from "./routes";
import PageLayout from "./layout/Page.layout";
function App() {
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
          <Route path="/checkout" element={<CartPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
