import { cn } from '@repo/ui';
import React, { useEffect, useRef, useState } from 'react';
import { TarotCard, tarotData } from '../../assets/data';
import { useAppContext } from '../../providers/app';
import CardTarot from './CardTarot';
import './style.css';
import { requestAI } from './ultis';

const PickCard = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement[]>([]);
  const [listData] = useState(() =>
    tarotData.sort(() => (Math.random() > 0.5 ? 1 : -1))
  );
  const { userInfo } = useAppContext();
  const [openIndex, setOpenIndex] = useState<number>();
  const [loadingIndex, setLoadingIndex] = useState<number>();

  const handleShuffle = () => {
    const listLength = listData.length;
    if (containerRef.current && boxRef?.current) {
      const { x, y, height, width } =
        containerRef.current?.getBoundingClientRect();

      const targetX = x + width / 2;
      const targetY = y + height / 2;

      boxRef?.current?.forEach((item: HTMLDivElement, index: number) => {
        const {
          x: childX,
          y: childY,
          height: childHeight,
          width: childWidth,
        } = item?.getBoundingClientRect();

        const distanceX = childX + childWidth / 2;
        const distanceY = childY + childHeight / 2;
        item.style.transform = `translate(${targetX - distanceX}px,${targetY - distanceY}px)`;
        const animateItem = item.animate(
          {
            transform: [
              // 'translate(0px)',
              `translate(${targetX - distanceX}px,${targetY - distanceY}px)`,
              `translate(${targetX / 2 - distanceX / 2}px,${targetY / 2 - distanceY / 2}px)`,
              `translate(${targetX - distanceX}px,${targetY - distanceY}px)`,
              'translate(0px)',
            ],
            // easing: ['cubic-bezier(0.68,-.55,.265,1.55)'],
            easing: ['cubic-bezier(1,-.55,.265,1.55)'],
            offset: [0, 0.3, 0.7, 1],
          },
          // timing options
          {
            delay: (index * 1500) / listLength,
            duration: 3400,
            // duration: 1500,
          }
        );
        animateItem.onfinish = () => {
          item.style.transform = 'translate(0px)';
        };
      });
    }
  };

  const handleSelect = (data: TarotCard, index: number) => () => {
    try {
      if (typeof loadingIndex === 'number' || typeof openIndex === 'number') {
        return;
      }
      const eleRef = boxRef.current[index] as HTMLDivElement;
      const eleContainerRef = containerRef.current;

      if (eleRef && eleContainerRef) {
        const { x, y, height, width } = eleContainerRef.getBoundingClientRect();

        const targetX = x + width / 2;
        const targetY = y + height / 2;

        const {
          x: childX,
          y: childY,
          height: childHeight,
          width: childWidth,
        } = eleRef?.getBoundingClientRect();

        const distanceX = childX + childWidth / 2;
        const distanceY = childY + childHeight / 2;
        eleRef.style.zIndex = '100';
        const animateItem = eleRef.animate(
          {
            transform: [
              'translate(0px),scale(1)',
              `translate(${targetX - distanceX}px,${targetY - distanceY}px) scale(4)`,
            ],
            easing: ['cubic-bezier(.17,.67,.83,.67)'],
          },
          {
            delay: 0,
            duration: 1000,
            fill: 'forwards',
          }
        );

        requestAI(data, userInfo).then((resData) => {
          setOpenIndex(index);
          const animateFinished = eleRef.animate(
            {
              transform: [
                `translate(${targetX - distanceX}px,${targetY - distanceY}px) scale(4)`,
                `translate(${targetX - distanceX - targetX / 2}px,${targetY - distanceY}px) scale(4)`,
              ],
              easing: ['cubic-bezier(.17,.67,.83,.67)'],
            },
            {
              delay: 1500,
              duration: 500,
              fill: 'forwards',
            }
          );
          animateFinished.onfinish = () => {
            onComplete({
              data,
              contentData: resData?.[0],
            });
          };
        });

        animateItem.onfinish = () => {
          setLoadingIndex(index);
        };
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleShuffle();
  }, []);

  return (
    <section className="overflow-y-scroll max-h-screen">
      {/* <button onClick={handleShuffle}>Trigger</button> */}
      <div className="container" ref={containerRef}>
        {listData.map((tarot, index) => (
          <div
            className={cn('cursor-pointer')}
            onClick={handleSelect(tarot, index)}
            key={index}
            ref={(el) => {
              if (el) {
                boxRef.current[index] = el;
              }
            }}
          >
            <CardTarot
              key={index}
              data={tarot}
              isOpened={openIndex === index}
              isLoading={loadingIndex === index && openIndex !== index}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PickCard;
