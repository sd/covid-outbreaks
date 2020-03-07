import React from 'react';
import './App.css';
import Views from './components/Views'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>COVID-19 Outbreaks</h1>
      </header>
      <div className="App-content">
        <Views />
      </div>
      <footer className="App-footer">
        By Sebastián Delmont
        {' • '}
        <a href='https://twitter.com/sd'>@sd</a>
      </footer>
    </div>
  );
}

export default App;
