import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import AuthLayout from './components/Layout/AuthLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        {/* <Route path="/" element={<Dashboard />}></Route> */}
      </Route>
    </Routes>
  );
}

export default App;
