import React from 'react';
import TarotApp from '../TarotContainer/TarotApp';
// import Image from 'next/image'
const Welcome = () => {
  const openModalSection = () => {
    window?.openModal({
      content: <TarotApp />,
    });
  };
  return (
    <div>
      <div
        className="cursor-pointer flex justify-center items-center"
        onClick={openModalSection}
      >
        <img
          src="/images/fortune_teller.png"
          alt="fortune_teller"
          className="w-52 h-80"
        />
      </div>
    </div>
  );
};

export default Welcome;
