import React from 'react';
import Welcome from '../Welcome';
// import { tarotData } from '../../assets/data';
// import CardTarot from './CardTarot';

type Props = {};

function TarotContainer({}: Props) {
  return (
    <div>
      {/* {tarotData.map((tarot, index) => (
        <CardTarot key={index} data={tarot} />
      ))} */}

      <Welcome />
    </div>
  );
}

export default TarotContainer;
