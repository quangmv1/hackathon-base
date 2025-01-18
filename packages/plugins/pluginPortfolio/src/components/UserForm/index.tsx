import { ConnectModal, useCurrentAccount } from '@mysten/dapp-kit';
import { Button, Input } from '@repo/ui';
import React, { useEffect, useState } from 'react';
import './style.css';

const UserForm = ({ onNext }: { onNext: () => void }) => {
  const [name, setName] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');
  const currentAccount = useCurrentAccount();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = document.getElementById('jack');
    setTimeout(() => {
      el?.classList.add('expand-img');
    }, 300);
  }, []);

  useEffect(() => {
    if (currentAccount && name) onNext();
  }, [currentAccount, name]);

  return (
    <div
      className="bg-black p-8 w-[1024px] mt-[20vh] mx-auto rounded-[24px] relative"
      style={{
        backgroundImage: 'url(/images/star_bg.jpg)',
        // backgroundImage:
        //   'url(https://media.istockphoto.com/id/1357138190/photo/flicker-abstract-particles-golden-dust-background.webp?b=1&s=612x612&w=0&k=20&c=D1lJSgCBLg-80L9Fv-E7_eE87wtKoL-0iU2UjIiy74o=)',
        backgroundPosition: 'cover',
        backgroundRepeat: 'repeat-x',
      }}
    >
      <div className="jack-position">
        <div className="animate-wiggle">
          <img
            id="jack"
            src="/images/jack_banner.png"
            alt="jack"
            className="w-96 h-96 mx-auto shrink-img rounded-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-space-200 items-center text-[24px] mt-[40vh]">
        <div>
          <p className="mb-2 text-bold">Your Name</p>
          <Input
            type="text"
            placeholder="Your name"
            className="p-4 h-14 text-[24px] border border-dividerColorDefault bg-black rounded-[12px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="ml-4 text-bold">
          <p className="mb-2">Date of birth</p>
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="0.0"
            className="p-4 h-14 text-[24px] border border-dividerColorDefault bg-black rounded-[12px]"
          />
        </div>
      </div>

      <ConnectModal
        trigger={
          <Button disabled={!!currentAccount || !name}>
            {' '}
            {currentAccount ? 'Connected' : 'Connect'}
          </Button>
        }
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
      />
    </div>
  );
};
export default UserForm;
