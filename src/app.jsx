import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Cadastro from "./components/Cadastro";
import Home from "./components/home";
import StoreHome from "./components/StoreHome";
import FashionCategory from "./components/FashionCategory";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<StoreHome />} />
        <Route path="/categoria/moda-acessorios" element={<FashionCategory />} />
        <Route path="/produtos/:id" element={<ProductDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;