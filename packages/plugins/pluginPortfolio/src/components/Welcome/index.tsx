import React from 'react';
// import Image from 'next/image'
import Typewriter from 'typewriter-effect';
import TarotApp from '../TarotContainer/TarotApp';

const Welcome = () => {
  const openModalSection = () => {
    window?.openModal({
      content: <TarotApp />,
      // contentClassName: 'rounded-[24px]',
    });
  };
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={openModalSection}
    >
      <div className="flex justify-center items-center rounded-lg w-48 h-48">
        <img
          src="/images/fortune_logo.png"
          alt="fortune_teller"
          className="w-full h-full"
        />
      </div>

      <div className="font-semibold text-[32px] text-link">
        <Typewriter
          options={{
            cursor: '',
            delay: 75,
          }}
          onInit={(typewriter) => {
            typewriter.typeString('PROPHESY').start();
          }}
        />
        <Typewriter
          options={{
            cursor: '',
            delay: 25,
          }}
          onInit={(typewriter) => {
            setTimeout(() => {
              typewriter.typeString('YOUR').start();
            }, 700);
          }}
        />
        <Typewriter
          options={{
            cursor: '',
            delay: 25,
          }}
          onInit={(typewriter) => {
            setTimeout(() => {
              typewriter.typeString('FATE').start();
            }, 1000);
          }}
        />
      </div>
    </div>
  );
};

export default Welcome;
