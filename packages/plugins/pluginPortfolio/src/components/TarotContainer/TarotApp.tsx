import React, { useMemo, useState } from 'react';
import CardTarot from './CardTarot';
import PickCard from './PickCard';
import './style.css';
import { nl2br } from './ultis';
import { useMintTarotNft } from '../ConnectWallet';
import { AppProvider } from '../../providers/app';
import { ConnectButton } from '@mysten/dapp-kit';
type Props = {};

enum EStep {
  WELCOME,
  PICK_CARD,
  RESULT,
}

function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <div onClick={onNext}>
      <img
        src="/images/fortune_teller.png"
        alt="fortune_teller"
        className="w-52 h-80"
      />
    </div>
      <ConnectButton className={'p-2'} />

    </div>
  );
}

function TarotAppContent({}: Props) {
  const { handleMint } = useMintTarotNft();
  const [step, setStep] = useState(EStep.WELCOME);
  // const {} = use

  const [result, setResult] = useState<any>({
    data: {
      name: 'King of Cups',
      number: '14',
      arcana: 'Minor Arcana',
      suit: 'Cups',
      img: 'c14.jpg',
      fortune_telling: [
        'This card represents an older man with a gentle, sensitive presence, likely born between February 9th and March 10th, who is known for his fairness and tolerance',
      ],
      keywords: ['wisdom', 'diplomacy', 'restraint', 'composure'],
      meanings: {
        light: [
          'Keeping a stiff upper lip',
          'Being brave and clear in the face of adverse circumstances',
          'Sharing experience as a way of comforting others',
          'Making fair and empathetic decisions',
          'Honoring the spirit, not just the letter, of the law',
        ],
        shadow: [
          'Allowing yourself to become rigid and unemotional',
          'Making unfair decisions based on a hidden agenda',
          'Making decisions without regard for their emotional impact on others',
          'Abusing spiritual authority',
          'Using emotional or spiritual leverage to exercise unhealthy control over others',
        ],
      },
      Elemental: 'Fire of Water.',
      Affirmation: '"I strive to be stable and fair-minded."',
      'Questions to Ask': [
        'What wise person could be consulted for good advice?',
        'How can I make sure I\'m being as objective and fair as possible?',
        'To what extent am I capable of keeping a "stiff upper lip?"',
      ],
    },
    contentData: {
      user: 'APT',
      text: 'chào Phú! lá bài King of Cups gợi mở một thông điệp về sự dũng cảm và khả năng ứng phó trong nghịch cảnh. cuộc đời thường đòi hỏi sự khôn ngoan và điềm tĩnh để vượt qua thử thách. 1. sự khôn ngoan giúp bạn nhìn thấy ánh sáng giữa bóng tối. 2. ngoại giao là cầu nối cho sự hòa hợp. 3. kiềm chế là sức mạnh thầm lặng. 4. giữ vững bình tĩnh giúp bạn vượt qua mọi bão tố. hãy để cuộc đời bạn là một bản giao hưởng của sự dũng cảm và trí tuệ!',
      action: 'NONE',
    },
  });
  function nextToPickCard() {
    setStep(EStep.PICK_CARD);
  }

  function nextToResult(data: any) {
    console.log('data', data);

    setResult(data);
    setStep(EStep.RESULT);
  }

  const splitContent = useMemo(() => {
    result.contentData?.text;
  }, [result.contentData?.text]);

  React.useEffect(() => {
    if (result.contentData?.text) {
      handleMint({ name: result.data?.name, description: result.contentData?.text, url: result.data?.imgUrl ?? `/images/cards/${result.data?.img}`, metadata: JSON.stringify(result.data) })
    }
  }, [result.contentData?.text, handleMint])

  return (
    <div>
      {step === EStep.WELCOME && <Welcome onNext={nextToPickCard} />}
      {step === EStep.PICK_CARD && <PickCard onComplete={nextToResult} />}
      {step === EStep.RESULT && (
        <div className="p-10 flex justify-center items-center fixed inset-0">
          <div className="flex">
            <div className="w-[300px] shrink-0">
              <CardTarot data={result.data} isOpened={true} />
            </div>
            <div className="p-5">
              <div
                dangerouslySetInnerHTML={{
                  __html: nl2br(result.contentData?.text),
                }}
                className="text-lg"
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const TarotApp = () => {
  return <AppProvider>
    <TarotAppContent/>
  </AppProvider>
}

export default TarotApp;
