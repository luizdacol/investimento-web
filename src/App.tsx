import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Layout/AuthLayout";
import Carteira from "./pages/Carteira";
import Operacoes from "./pages/renda-variavel/Operacoes";
import FormOperacoes from "./pages/renda-variavel/FormOperacoes";
import Proventos from "./pages/renda-variavel/Proventos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Carteira />}></Route>
        <Route path="/renda-variavel/operacoes" element={<Operacoes />}></Route>
        <Route path="/renda-variavel/proventos" element={<Proventos />}></Route>
        <Route
          path="/renda-variavel/form-operacoes"
          element={<FormOperacoes />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
