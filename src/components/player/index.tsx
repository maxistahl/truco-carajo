import React from 'react';
import Card, { CardType } from '../card/card';

type availableMovements = {
  id: string;
  name: string;
  type: string;
}[];

export type PlayerType = {
  id: string;
  availableMovements: availableMovements;
  cards: CardType[];
  playerName: string;
  score: number;
}

type PlayerProps = PlayerType & {
  isCurrentPlayer: boolean;
}

const Player: React.FC<PlayerProps> = ({
  id,
  availableMovements,
  cards,
  playerName,
  score,
  isCurrentPlayer,
}) => {
  const flipWhenCurrentPlayer = (cardId: string) => {
    console.log('voltear carta ' + cardId + ' del jugador ' + id);
    // post server to flip card
  }

  return (
    <>
      <div className='cards-hand'>
        {cards.map(({ id, suit, value, shown, order }) => (
          <Card
            key={id}
            id={id}
            suit={suit}
            value={value}
            shown={shown}
            order={order}
            onFlip={flipWhenCurrentPlayer}
            isCurrentPlayer={isCurrentPlayer}
          />
        ))}
      </div>
      <div className='player-actions'>
        <h2>{playerName}</h2>
        <p>Score: {score}</p>
        <p>Available Movements: {JSON.stringify(availableMovements)}</p>
      </div>
    </>
  );
};

export default Player;
