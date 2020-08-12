import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Player from './components/Player';

import { useStateWithSessionStorage } from './components/models';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './components/Router';
import NavBar from './components/NavBar';


function App() {
  const [token, setToken] = useStateWithSessionStorage("token", "");
  console.log(token);
  let tokenval = sessionStorage.getItem("token");
  console.log(tokenval);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar token={tokenval} />
        <Router token={tokenval} setToken={setToken} />
      </BrowserRouter>
    </div>
  );
}

export default App;
