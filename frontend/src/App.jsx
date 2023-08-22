import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./routes";
import PageLayout from "./layout/Page.layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
