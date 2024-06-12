import React from 'react'
import ReactDOM from 'react-dom/client'
import Game from './Game.tsx'
import './index.css'
import GameProvider from './Context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameProvider>
      <Game />
    </GameProvider>
  </React.StrictMode>,
);
