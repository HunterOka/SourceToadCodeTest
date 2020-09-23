import React from 'react';
import logo from './logo.svg';
import './App.css';


import NumberPad from './Components/NumberPad.jsx'

function App() {
  return (
    <div className="container">
      <header className="App-header">
        <NumberPad buttonClass='bg-grey'/>
        <p>
          Hello Squirrel!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
