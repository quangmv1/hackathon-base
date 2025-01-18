import React, { useEffect } from 'react';
import { Input } from '@repo/ui';
import './style.css';
import { ConnectButton } from '@mysten/dapp-kit';

const UserForm = ({onNext}:{
  onNext: ()=>void
}) => {

  const [name, setName] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');

  useEffect(() => {
    const el = document.getElementById('jack');
    setTimeout(() => {
      el?.classList.add('expand-img');
    }, 300);
  },[])

  return (
    <div className='bg-black p-8 w-[1024px] mt-[20vh] mx-auto rounded-[24px] relative'
      style={{
        backgroundImage: 'url(/images/star_bg.jpg)',
      }}
    >
      <div onClick={onNext} className='jack-position'>
        <img
          id='jack'
          src="/images/jack_banner.png"
          alt="jack"
          className="w-96 h-96 mx-auto shrink-img rounded-full"
        />
      </div>
      <div className='grid grid-cols-2 gap-space-200 items-center text-[24px] mt-[40vh]'>
        <div>
          <p className='mb-2 text-bold'>Your Name</p>
          <Input
            type="text"
            placeholder="Your name"
            className="p-4 h-14 text-[24px] border border-dividerColorDefault bg-black rounded-[12px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='ml-4 text-bold'>
          <p className='mb-2'>Date of birth</p>
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="0.0"
            className="p-4 h-14 text-[24px] border border-dividerColorDefault bg-black rounded-[12px]"
          />
        </div>

      </div>

      <ConnectButton className={'p-2'} />
      {/* <Button onClick={()=>{
        console.log("onNext");
        onNext()
      }} >Connect 2</Button> */}
    </div>
  );
}
export default UserForm;