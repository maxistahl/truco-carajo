import { useEffect, useState } from 'react';
import './Game.css';
import Player, { PlayerType } from './components/player';
import cards from './data/cards.json';

type GameMode = 'vs-computer' | 'vs-human';

type GameStateType = {
  player1: PlayerType;
  player2: PlayerType;
  currentPlayer: string;
  status: 'init' | 'playing' | 'end';
  score: {
    player1: number;
    player2: number;
  };
  winner?: string;
  gameMode: GameMode;
};

const initialGameState: GameStateType = {
  player1: {
    id: 'player1',
    playerName: 'Jugador 1',
    score: 0,
    cards: [
      cards[0],
      cards[5],
      cards[9],
    ],
    availableMovements: [
      { id: '1', name: 'Envido', type: 'envido' },
      { id: '2', name: 'Truco', type: 'truco' },
      { id: '3', name: 'Flor', type: 'flor' },
    ],
  },
  player2: {
    id: 'player2',
    playerName: 'Jugador 2',
    score: 0,
    cards: [
      cards[20],
      cards[7],
      cards[38],
    ],
    availableMovements: [
      { id: '1', name: 'Envido', type: 'envido' },
      { id: '2', name: 'Truco', type: 'truco' },
      { id: '3', name: 'Flor', type: 'flor' },
    ],
  },
  currentPlayer: 'player1',
  status: 'init',
  score: {
    player1: 0,
    player2: 0,
  },
  gameMode: 'vs-computer',
};

const changingGameState: GameStateType = {
  player1: {
    id: 'player1',
    playerName: 'Jugador 1',
    score: 0,
    cards: [
      { ...cards[0], shown: true },
      cards[5],
      cards[9],
    ],
    availableMovements: [
      { id: '2', name: 'Truco', type: 'truco' },
      { id: '3', name: 'Flor', type: 'flor' },
    ],
  },
  player2: {
    id: 'player2',
    playerName: 'Jugador 2',
    score: 0,
    cards: [
      { ...cards[20], shown: true },
      cards[7],
      cards[38],
    ],
    availableMovements: [
      { id: '1', name: 'Envido', type: 'envido' },
      { id: '2', name: 'Truco', type: 'truco' },
      { id: '3', name: 'Flor', type: 'flor' },
    ],
  },
  currentPlayer: 'player2',
  status: 'playing',
  score: {
    player1: 0,
    player2: 10,
  },
  gameMode: 'vs-computer',
};

function Game() {
  const [gameState, setGameState] = useState<GameStateType | null>(null);

  const className = `status-bar${gameState && ' playing'}`;

  const startGame = (mode = 'vs-computer' as GameMode) => {
    console.log('Game started');
    setGameState({ ...initialGameState, gameMode: mode });
  }

  useEffect(() => {
    if (gameState?.status === 'init') {
      console.log('Game is initializing');
      setTimeout(() => {
        if (gameState?.status === 'init') {
          setGameState(changingGameState);
          console.log('Game is changing state');
        }
      }, 3000);
    }
  }, [gameState]);

  return (
    <>
      <div className={className}>
        <h1>Truco Carajo!</h1>
        <button onClick={() => startGame()}>Contra la compu</button>
        <button onClick={() => startGame('vs-human')}>Bancatela contra alguien, GIL!</button>
      </div>

      {gameState !== null && (
        <div>
          <h2>Turno de: {gameState.currentPlayer}</h2>
          <div className='game-board'>
            <Player {...gameState.player1} isCurrentPlayer={gameState.currentPlayer === 'player1'} />
            <Player {...gameState.player2} isCurrentPlayer={false} />
            {/* <Player {...gameState.player2} isCurrentPlayer={gameState.currentPlayer === 'player2' && gameState.gameMode !== 'vs-computer'} /> */}
          </div>
        </div>
      )}
    </>
  )
}

export default Game;
