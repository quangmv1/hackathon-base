import { cn } from '@repo/ui/src/lib/utils';
import React from 'react';
import { TarotCard } from '../../assets/data';
import './style.css';
type Props = {
  isOpened?: boolean;
  data: TarotCard;
};

function CardTarot({ isOpened, data }: Props) {
  return (
    <div
      className={cn('flip-card', {
        'flip-card-opened': isOpened,
      })}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src="img_avatar.png" alt="Avatar" />
        </div>
        <div className="flip-card-back">
          <h1>John Doe</h1>
          <p>Architect & Engineer</p>
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  );
}

export default CardTarot;
