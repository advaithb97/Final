import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Player from './components/Player';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Player />
      </div>
    );
  }
}

export default App;
