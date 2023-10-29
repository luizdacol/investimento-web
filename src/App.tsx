import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Layout/AuthLayout";
import Carteira from "./pages/Carteira";
import OperacoesRendaVariavel from "./pages/renda-variavel/Operacoes";
import OperacoesRendaFixa from "./pages/renda-fixa/Operacoes";
import FormOperacoes from "./pages/renda-variavel/FormOperacoes";
import Proventos from "./pages/renda-variavel/Proventos";
import FormProventos from "./pages/renda-variavel/FormProventos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Carteira />}></Route>
        <Route
          path="/renda-fixa/operacoes"
          element={<OperacoesRendaFixa />}
        ></Route>
        <Route
          path="/renda-variavel/operacoes"
          element={<OperacoesRendaVariavel />}
        ></Route>
        <Route path="/renda-variavel/proventos" element={<Proventos />}></Route>
        <Route
          path="/renda-variavel/form-operacoes"
          element={<FormOperacoes />}
        ></Route>
        <Route
          path="/renda-variavel/form-proventos"
          element={<FormProventos />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
