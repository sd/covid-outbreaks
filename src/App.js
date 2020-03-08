import React from 'react';
import './App.css';
import Views from './components/Views'
import DataLoader from './components/DataLoader'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>COVID-19 Outbreaks</h1>

        <div>
          <span className='blockUnder900px'>Red: deaths, one dot per case.</span>
          <span className='hideUnder900px'>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className='blockUnder900px'>Gray: confirmed cases, but at a 1:100 scale.</span>
        </div>
      </header>
      <div className="App-content">
        <Views />
      </div>
      <footer className="App-footer">
        <span className='blockUnder900px'>
          <span className='blockUnder600px'>
            Data from <a href='https://github.com/CSSEGISandData/COVID-19'>John Hopkins Univeristy</a>
          </span>
          <span className='hideUnder600px'>{' • '}</span>
          <span className='blockUnder600px'>
            <DataLoader />
          </span>
        </span>
        <span className='hideUnder900px'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className='blockUnder900px'>
          <span className='blockUnder600px'>
            Visualization by Sebastián Delmont
            {' • '}
            <a href='https://twitter.com/sd'>@sd</a>
            {' • '}
            <a href='https://github.com/sd/covid-outbreaks'>github</a>
          </span>
        </span>
      </footer>
    </div>
  );
}

export default App;
