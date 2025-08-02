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
import AtivosRendaVariavel from "./pages/renda-variavel/Ativos";
import FormAtivosRendaVariavel from "./pages/renda-variavel/FormAtivos";
import AtivosRendaFixa from "./pages/renda-fixa/Ativos";
import FormAtivosRendaFixa from "./pages/renda-fixa/FormAtivos";
import ComposicaoCarteira from "./pages/graficos/ComposicaoCarteira";
import ProventosChart from "./pages/graficos/Proventos";
import TaxasImpostos from "./pages/renda-variavel/TaxasImpostos";
import AtivosCriptomoedas from "./pages/criptomoedas/Ativos";
import FormAtivosCriptomoedas from "./pages/criptomoedas/FormAtivos";
import OperacoesCriptomoedas from "./pages/criptomoedas/Operacoes";
import FormOperacoesCriptomoedas from "./pages/criptomoedas/FormOperacoes";
import LucrosPrejuizos from "./pages/renda-variavel/LucrosPrejuizos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Carteira />}></Route>
        {/* Rotas graficos */}
        <Route
          path="/graficos/composicao-carteira"
          element={<ComposicaoCarteira />}
        ></Route>
        <Route path="/graficos/proventos" element={<ProventosChart />}></Route>
        {/* Rotas renda variavel */}
        <Route
          path="/renda-variavel/ativos"
          element={<AtivosRendaVariavel />}
        ></Route>
        <Route
          path="/renda-variavel/operacoes"
          element={<OperacoesRendaVariavel />}
        ></Route>
        <Route path="/renda-variavel/proventos" element={<Proventos />}></Route>
        <Route
          path="/renda-variavel/form-ativos"
          element={<FormAtivosRendaVariavel />}
        ></Route>
        <Route
          path="/renda-variavel/form-operacoes"
          element={<FormOperacoesRendaVariavel />}
        ></Route>
        <Route
          path="/renda-variavel/form-proventos"
          element={<FormProventos />}
        ></Route>
        <Route
          path="/renda-variavel/lucros-prejuizos"
          element={<LucrosPrejuizos />}
        ></Route>
        <Route
          path="/renda-variavel/taxas-impostos"
          element={<TaxasImpostos />}
        ></Route>
        {/* Rotas renda fixa */}
        <Route path="/renda-fixa/ativos" element={<AtivosRendaFixa />}></Route>
        <Route
          path="/renda-fixa/operacoes"
          element={<OperacoesRendaFixa />}
        ></Route>
        <Route
          path="/renda-fixa/form-ativos"
          element={<FormAtivosRendaFixa />}
        ></Route>
        <Route
          path="/renda-fixa/form-operacoes"
          element={<FormOperacoesRendaFixa />}
        ></Route>
        {/* Rotas criptomoedas */}
        <Route
          path="/criptomoedas/ativos"
          element={<AtivosCriptomoedas />}
        ></Route>
        <Route
          path="/criptomoedas/operacoes"
          element={<OperacoesCriptomoedas />}
        ></Route>
        <Route
          path="/criptomoedas/form-ativos"
          element={<FormAtivosCriptomoedas />}
        ></Route>
        <Route
          path="/criptomoedas/form-operacoes"
          element={<FormOperacoesCriptomoedas />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
