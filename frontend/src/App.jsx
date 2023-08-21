import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./routes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/shop" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
