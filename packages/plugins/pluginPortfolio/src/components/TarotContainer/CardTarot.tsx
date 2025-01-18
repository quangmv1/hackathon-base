import { cn } from '@repo/ui';
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
      className={cn('flip-card aspect-[350/600] cursor-pointer ', {
        'flip-card-opened': isOpened,
      })}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {/* <img src={data.img} alt="Avatar" /> */}
          <img
            src="/images/back-tarot.png"
            alt="bg-header"
            className="hidden md:block h-full absolute -z-[1] w-full object-contain"
          />
        </div>
        <div className="flip-card-back">
          <img
            src={`/images/cards/${data.img}`}
            alt="bg-header"
            className="hidden md:block h-full absolute -z-[1] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default CardTarot;
