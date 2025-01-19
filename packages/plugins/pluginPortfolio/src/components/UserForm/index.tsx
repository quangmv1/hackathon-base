import {
  ConnectButton,
  ConnectModal,
  useAutoConnectWallet,
  useCurrentAccount,
} from '@mysten/dapp-kit';
import { Button, Input } from '@repo/ui';
import React, { useEffect, useState } from 'react';
import { useFetchAccountNftTokens } from '../ConnectWallet';
import './style.css';

interface Props {
  onNext: () => void;
  toggleViewCard?: () => void;
}

const InfoFillBoard = ({ onNext }: Props) => {
  const [name, setName] = React.useState('');
  const [open, setOpen] = useState(false);
  const [birthDate, setBirthDate] = React.useState('');
  const autoStatus = useAutoConnectWallet();
  const currentAccount = useCurrentAccount();

  useEffect(() => {
    if (currentAccount && name && autoStatus !== 'attempted') onNext();
  }, [currentAccount, name, autoStatus]);

  return (
    <>
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
      <div className="flex flex-col items-center mt-3">
        <ConnectModal
          trigger={
            <Button className="w-1/4 border-spacing-4 " disabled={!name}>
              {' '}
              {'Connect'}
            </Button>
          }
          open={open}
          onOpenChange={(isOpen) => setOpen(isOpen)}
        />
      </div>
    </>
  );
};

export const ViewTarotCard = ({
  toggleViewCard,
}: {
  toggleViewCard: () => void;
}) => {
  const { data: nftList } = useFetchAccountNftTokens();

  return (
    <div>
      <div className="py-2">
        <Button className="pl-5" onClick={toggleViewCard}>
          Back
        </Button>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh_-_50px)] py-5">
        <div className="w-full max-w-screen-lg mx-auto gap-2">
          {nftList?.map(
            (nft : any) =>
              nft?.content?.fields?.url && (
                <div
                  className="flex gap-2"
                  key={nft?.content?.fields?.id?.id ?? crypto.randomUUID()}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={nft.content.fields.url}
                      alt="Image Of Parcels"
                      width="150"
                      height="150"
                    />
                    <div className="text-sm text-center py-2">
                      {nft?.content?.fields?.name}
                    </div>
                  </div>
                  <div className="flex justify-center items-center text-lg">
                    <div>{nft?.content?.fields?.description}</div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

const DailyTarotCard = (props: Props) => {
  const { data: nftList } = useFetchAccountNftTokens();
  return (
    <div className='mt-3'>
      <ConnectButton className="absolute top-0 " />
      <div className="w-full all-center absolute bottom-0 gap-5 p-5">
        <Button className="min-w-[200px] rounded-2xl " onClick={props.onNext}>
          {' '}
          Draw{' '}
        </Button>
        {
          nftList?.length > 0 && (
            <Button
              className="min-w-[200px] rounded-2xl"
              onClick={() => {
                if (props.toggleViewCard) {
                  props.toggleViewCard();
                }
              }}
            >
            {' '}
            Your Card{' '}
            </Button>
          )
        }
       
      </div>
    </div>
  );
};

const UserForm = ({ onNext, toggleViewCard }: Props) => {
  const currentAccount = useCurrentAccount();

  useEffect(() => {
    const el = document.getElementById('jack');
    setTimeout(() => {
      el?.classList.add('expand-img');
    }, 300);
  }, []);

  return (
    <div
      className="bg-black p-8 w-[1024px] mt-[20vh] mx-auto rounded-[24px] relative min-h-[600px]"
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
     
      {!currentAccount && <InfoFillBoard onNext={onNext} />}

      {currentAccount && (
        <DailyTarotCard onNext={onNext} toggleViewCard={toggleViewCard} />
      )}
    </div>
  );
};
export default UserForm;
