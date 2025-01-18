import React from 'react';
import { tarotData } from '../../assets/data';
import CardTarot from './CardTarot';

type Props = {};

function TarotContainer({}: Props) {
  return (
    <div>
      {tarotData.map((tarot) => (
        <CardTarot key={tarot.} data={tarot} />
      ))}
    </div>
  );
}

export default TarotContainer;
