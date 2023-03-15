import React from 'react';
import { createRoot } from 'react-dom/client'
import AppContainer from './modules/app'
import './styles.css';

const App = () => {
  return (
    <React.StrictMode>
      <AppContainer />
    </React.StrictMode>
  );
};

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(<App />)
