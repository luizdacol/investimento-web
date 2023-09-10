import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Layout/AuthLayout";
import Carteira from "./pages/Carteira";
import Acoes from "./pages/Acoes";
import FundosImobiliario from "./pages/FundosImobiliario";
import FormAcoes from "./pages/FormAcoes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Carteira />}></Route>
        <Route path="/acoes" element={<Acoes />}></Route>
        <Route
          path="/fundos-imobiliario"
          element={<FundosImobiliario />}
        ></Route>
        <Route path="/form-acoes" element={<FormAcoes />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
