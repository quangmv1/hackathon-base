import { cn } from '@repo/ui';
import React from 'react';
import { TarotCard } from '../../assets/data';
import './style.css';

type Props = {
  data: TarotCard;
  isOpened?: boolean;
  isShowName?: boolean;
  isLoading?: boolean;
};

function CardTarot({ isOpened, data, isShowName, isLoading }: Props) {
  return (
    <div
      className={cn('flip-card aspect-[350/600]', {
        'flip-card-opened': isOpened,
        // 'animate-wiggle': isLoading,
        'animate-heartBeat': isLoading,
        // 'animate-bounce': isLoading,
      })}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {/* <img src={data.img} alt="Avatar" /> */}
          <img
            // src="/images/back2.jpg"
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
      {isShowName && (
        <div className="text-center text-lg">
          <strong className="text-sm">{data.name}</strong>
        </div>
      )}
    </div>
  );
}

export default CardTarot;
