import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <div>
    <header>
      <h2>Reverser</h2>
    </header>
    <App />
  </div>,
  document.getElementById('root') as HTMLElement,
);
