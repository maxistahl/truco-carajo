import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { PlayerType } from './components/player';
import gameApi from './mocks';


export type GameMode = 'vs-computer' | 'vs-human';

export type GameStateType = {
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

export type GameStateContextType = {
  gameState: GameStateType | null;
  setGameState: Dispatch<SetStateAction<GameStateType | null>>;
  gameId: string | null;
  startGame: (mode?: GameMode) => void;
  updateState: () => void;
};

export const GameState = createContext<GameStateContextType>({
  gameState: null,
  setGameState: () => null,
  gameId: null,
  startGame: () => null,
  updateState: () => null,
});

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameStateType | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);

  const startGame = async (mode = 'vs-computer' as GameMode) => {
    try {
      const res = await gameApi.post('/game/start', { mode });
      // setGameState({ ...res.data, gameMode: mode });
      setGameId(res.data.gameId);
    } catch (error) {
      console.error('Error starting game', error);
    }
  }

  const updateState = async () => {
    try {
      const res = await gameApi.get(`/game/${gameId}/status`);
      setGameState(res.data);
    } catch (error) {
      console.error('Error starting game', error);
    }
  }

  useEffect(() => {
    if (gameId) {
      console.log(gameId);
      updateState();
    }
  }, [gameId]);

  useEffect(() => {
    if (gameState?.status === 'init') {
      // setTimeout(() => {
      //   if (gameState?.status === 'init') {
      //     setGameState(changingGameState);
      //     console.log('Game is changing state');
      //   }
      // }, 3000);
    }
  }, [gameState]);

  return (
    <GameState.Provider value={{ gameState, setGameState, gameId, startGame, updateState }}>
      {children}
    </GameState.Provider>
  );
};

export default GameProvider;