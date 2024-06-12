import { useContext } from 'react';
import './Game.scss';
import Player from './components/player';
import { GameState, GameStateContextType } from './Context';

function Game() {
  const { gameState, startGame } = useContext<GameStateContextType>(GameState);
  const className = `status-bar${gameState ? ' playing' : ''}`;

  return (
    <>
      <div className={className}>
        <h1>Truco Carajo!</h1>
        <button onClick={() => startGame()}>Contra la compu</button>
        <button onClick={() => startGame('vs-human')}>¡Bancatela contra alguien, gil!</button>
      </div>

      {gameState !== null && (
        <div className='game-board-container'>
          <h2>Turno de: {gameState.currentPlayer}</h2>
          <div className='game-board'>
            <Player {...gameState.player1} isCurrentPlayer={gameState.currentPlayer === 'player1'} />
            <Player {...gameState.player2} isCurrentPlayer={false} />
          </div>
        </div>
      )}
    </>
  )
}

export default Game;
