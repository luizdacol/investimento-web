import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Layout/AuthLayout";
import Carteira from "./pages/Carteira";
import OperacoesRendaVariavel from "./pages/renda-variavel/Operacoes";
import OperacoesRendaFixa from "./pages/renda-fixa/Operacoes";
import FormOperacoesRendaVariavel from "./pages/renda-variavel/FormOperacoes";
import FormOperacoesRendaFixa from "./pages/renda-fixa/FormOperacoes";
import Proventos from "./pages/renda-variavel/Proventos";
import FormProventos from "./pages/renda-variavel/FormProventos";
import Graficos from "./pages/Graficos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Carteira />}></Route>
        <Route path="/graficos" element={<Graficos />}></Route>
        {/* Rotas renda variavel */}
        <Route
          path="/renda-variavel/operacoes"
          element={<OperacoesRendaVariavel />}
        ></Route>
        <Route path="/renda-variavel/proventos" element={<Proventos />}></Route>
        <Route
          path="/renda-variavel/form-operacoes"
          element={<FormOperacoesRendaVariavel />}
        ></Route>
        <Route
          path="/renda-variavel/form-proventos"
          element={<FormProventos />}
        ></Route>
        {/* Rotas renda fixa */}
        <Route
          path="/renda-fixa/operacoes"
          element={<OperacoesRendaFixa />}
        ></Route>
        <Route
          path="/renda-fixa/form-operacoes"
          element={<FormOperacoesRendaFixa />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
