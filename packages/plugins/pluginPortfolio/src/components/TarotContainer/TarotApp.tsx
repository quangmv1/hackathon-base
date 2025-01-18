import { Button } from '@repo/ui';
import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { AppProvider } from '../../providers/app';
import { useMintTarotNft } from '../ConnectWallet';
import UserForm, { ViewTarotCard } from '../UserForm';
import CardTarot from './CardTarot';
import PickCard from './PickCard';
import './style.css';

type Props = {};

enum EStep {
  WELCOME,
  PICK_CARD,
  RESULT,
  VIEW_CARD
}

function TarotAppContent({}: Props) {
  const { handleMint, isLoading, mintData } = useMintTarotNft();
  const [step, setStep] = useState(EStep.WELCOME);
  const [isShowMint, setIsShowMint] = useState(false);

  const [result, setResult] = useState<any>();
  //   {
  //   data: {
  //     name: 'Page of Cups',
  //     number: '11',
  //     arcana: 'Minor Arcana',
  //     suit: 'Cups',
  //     img: 'c11.jpg',
  //     fortune_telling: [
  //       'This card represents a young man or woman with a watery, dreamy demeanor, likely born a Libra, Scorpio, or Sagittarius, who wants to start a new relationship with you',
  //     ],
  //     keywords: [
  //       'enthusiasm',
  //       'first impressions',
  //       'romanticism',
  //       'superficiality',
  //     ],
  //     meanings: {
  //       light: [
  //         'Showing your emotions freely',
  //         'Throwing yourself into romance',
  //         'Nursing a secret crush',
  //         'Indulging in romantic fantasy',
  //         'Starting a new relationship',
  //         'Recalling your first love',
  //         'Experiencing love for the first time',
  //         'Converting to a new religion',
  //       ],
  //       shadow: [
  //         'Mistaking a crush for true love',
  //         'Reading romantic intention into innocent action',
  //         'Frantically trying to impress others',
  //         'Indulging in overly-sweet sentimentality',
  //         'Pretending to more romantic or spiritual experience than you possess',
  //       ],
  //     },
  //     Elemental: 'Earth of Water.',
  //     Affirmation: '"I am ready to embrace love and Spirit."',
  //     'Questions to Ask': [
  //       'How worried are you that others will see you as foolish or inexperienced?',
  //       'To what extent can you be honest about your lack of experience in love and faith?',
  //       'How can you maintain enthusiasm over time?',
  //     ],
  //   },
  //   contentData: {
  //     user: 'APT',
  //     text: 'chào Phú! lá bài Page of Cups nhắc nhở rằng bắt đầu một mối quan hệ mới có thể mang lại sự hứng khởi và khám phá. cuộc sống là một hành trình của những ấn tượng đầu tiên và sự lãng mạn.\n1. sự nhiệt tình giúp bạn mở lòng và đón nhận những trải nghiệm mới.\n2. những ấn tượng đầu tiên có thể tạo nền tảng cho mối quan hệ lâu dài.\n3. sự lãng mạn làm cho cuộc sống trở nên phong phú và thú vị.\n4. hãy để sự nhiệt tình và lãng mạn dẫn dắt bạn trong hành trình cuộc đời. cuộc đời là một hành trình của sự khám phá và tình yêu mới mẻ!',
  //     action: 'NONE',
  //   },
  // }

  function nextToPickCard() {
    setStep(EStep.PICK_CARD);
  }

  const toggleViewCard = () => {
    setStep( pre =>{
      console.log(pre)
      return  pre === EStep.VIEW_CARD ? EStep.WELCOME : EStep.VIEW_CARD
    })
  }

  function nextToResult(data: any) {
    setResult(data);
    setStep(EStep.RESULT);
  }

  async function handleMintAction() {
    if (mintData?.digest) {
      window.open(`https://suiscan.xyz/devnet/tx/${mintData.digest}`);
      return;
    }

    if (result?.contentData?.text) {
      try {
        handleMint({
          name: result.data?.name,
          description: result.contentData?.text,
          url: result.data?.imgUrl ?? `/images/cards/${result.data?.img}`,
          metadata: JSON.stringify(result.data),
        });
      } catch (error) {}
    }
  }
  useEffect(() => {
    if (result?.contentData?.text) {
      setTimeout(() => {
        setIsShowMint(true);
      }, 7000);
    }
    return () => {
      setIsShowMint(false);
    };
  }, [result?.contentData?.text]);

  return (
    <div id="container">
      {step === EStep.WELCOME && <UserForm onNext={nextToPickCard} toggleViewCard={toggleViewCard} />}
      {step === EStep.VIEW_CARD && <ViewTarotCard toggleViewCard={toggleViewCard} />}
      {step === EStep.PICK_CARD && <PickCard onComplete={nextToResult} />}
      {step === EStep.RESULT && (
        <div className="p-10 flex justify-center items-center fixed inset-0">
          <div className="flex max-w-screen-lg mx-auto gap-x-5">
            <div className="w-[350px] shrink-0">
              <CardTarot data={result.data} isOpened={true} isShowName />
            </div>
            <div className="p-5 w-[500px]">
              <div>
                <TypeAnimation
                  className="text-2xl whitespace-break-spaces"
                  style={{
                    whiteSpace: 'pre-line',
                    display: 'block',
                  }}
                  wrapper="div"
                  sequence={[result.contentData?.text]}
                  repeat={0}
                  speed={90}
                  cursor={false}
                />
              </div>
              {/* <div
                dangerouslySetInnerHTML={{
                  __html: nl2br(result.contentData?.text),
                }}
                className="text-2xl whitespace-break-spaces"
              ></div> */}
              {isShowMint && (
                <Button
                  disabled={isLoading}
                  onClick={handleMintAction}
                  className="mt-5"
                >
                  {mintData ? 'View transaction' : 'Get your Tarot Card'}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className="firefly"></div>
      ))}
    </div>
  );
}

const TarotApp = () => {
  return (
    <AppProvider>
      <TarotAppContent />
    </AppProvider>
  );
};

export default TarotApp;
