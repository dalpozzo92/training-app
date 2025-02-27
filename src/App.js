/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
*/

// src/App.js
// src/App.js
// src/App.js
// src/App.js  <Route path="/login" element={<Login />} /> {/* La pagina di login */}
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Usa Routes invece di Switch
import Login from './Login';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} /> {/* La pagina di login */}
        <Route path="/home" element={<Home />} /> {/* La pagina Home */}
      </Routes>
    </Router>
  );
};

export default App;


