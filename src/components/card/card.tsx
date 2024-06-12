import React, { useEffect, useState } from 'react';

export type CardType = {
  id: string;
  suit: string;
  value: number;
  shown: boolean;
  order: number;
}

type CardProps = {
  isCurrentPlayer: boolean;
  onFlip: (id: string) => void;
} & CardType;

const Card: React.FC<CardProps> = ({ id, suit, value, shown, order, onFlip, isCurrentPlayer }) => {
  const [show, setShow] = useState(shown);

  useEffect(() => {
    setShow(shown);
  }, [shown]);

  const onFlipEvent = () => {
    if (show || !isCurrentPlayer) return;
    onFlip(id);
    setShow(true);
  }

  const cardClass = `card${show ? ' flipped' : ''} order-${order} suit-${suit} value-${value}`;

  console.log('Card render', id, show, shown, cardClass);

  return (
    <div onClick={onFlipEvent} className={cardClass}>
      <div className="face front">
        <span>{value}</span>
      </div>
      <div className="face back" />
    </div>
  );
};

export default Card;
