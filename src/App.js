import React from 'react';
import './App.css';
import Views from './components/Views'
import DataLoader from './components/DataLoader'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>COVID-19 Outbreaks, deaths per day</h1>
      </header>
      <div className="App-content">
        <Views />
      </div>
      <footer className="App-footer">
        <div className="left">
          <DataLoader />
        </div>
        <div className="right">
          Data from <a href='https://github.com/CSSEGISandData/COVID-19'>John Hopkins Univeristy</a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          Visualization by Sebastián Delmont
          {' • '}
          <a href='https://twitter.com/sd'>@sd</a>
          {' • '}
          <a href='https://github.com/sd/covid-outbreaks'>github</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
