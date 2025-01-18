import React, { useEffect, useState } from 'react';
import { Button, Input } from '@repo/ui';
import './style.css';
import {
  ConnectModal,
  useAutoConnectWallet,
  useCurrentAccount,
  ConnectButton,
} from '@mysten/dapp-kit';
import { useFetchAccountNftTokens } from '../ConnectWallet';

interface Props {
  onNext: () => void;
  toggleViewCard?: () => void
}

const InfoFillBoard = ({ onNext }:Props) => {
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
      <div className="flex flex-col items-center">
        <ConnectModal
          trigger={
            <Button
              className="w-1/4 border-spacing-4 "
              disabled={!name}
            >
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

export const ViewTarotCard = ({ toggleViewCard }: {toggleViewCard: () => void}) => {
  const { data: nftList } = useFetchAccountNftTokens();

  return <div>
    <Button onClick={toggleViewCard} >Back</Button>
    <table className="w-full">
    {nftList?.map((nft) => nft?.content?.fields?.url && (
      <tr key={nft?.content?.fields?.id?.id ?? crypto.randomUUID()}>
        <th>
          <figure>
            <img
              src={nft.content.fields.url}
              alt="Image Of Parcels"
              width="150"
              height="150"
            />
            <figcaption> {nft?.content?.fields?.name}  </figcaption>
          </figure>
        </th>
        <th className='text-left pl-5' > {nft?.content?.fields?.description} </th>
      </tr>
    ))}
  </table>
  </div>
}

const DailyTarotCard = (props: Props) => {

  return (
    <>
      <ConnectButton className="absolute top-0 " />
      <div className="w-full all-center absolute bottom-0 gap-5 p-5" >
      <Button className='min-w-[200px] rounded-2xl ' onClick={props.onNext} > Draw </Button>
      <Button className='min-w-[200px] rounded-2xl' onClick={ () => {
        if (props.toggleViewCard) {
          props.toggleViewCard();
        }
      } } > Your Card </Button>
      </div>
    </>
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
      }}
    >
      <div onClick={onNext} className="jack-position">
        <img
          id="jack"
          src="/images/jack_banner.png"
          alt="jack"
          className="w-96 h-96 mx-auto shrink-img rounded-full"
        />
      </div>
      {!currentAccount && (
        <InfoFillBoard
          onNext={onNext}

        />
      )}

      {currentAccount && <DailyTarotCard onNext={onNext} toggleViewCard={toggleViewCard} />}
    </div>
  );
};
export default UserForm;
