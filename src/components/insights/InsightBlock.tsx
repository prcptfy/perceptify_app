'use client';

import React from 'react';
import FacebookIcon from '../icons/FacebookIcon';
import TwitterIcon from '../icons/TwitterIcon';
import TikTokIcon from '../icons/TikTokIcon';
import InstagramIcon from '../icons/InstagramIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import InsightAlert from './InsightAlert';
import InsightGraph from './InsightGraph';
import CloseButtonIcon from '../icons/closeButtonIcon';

type Logos =
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'tiktok'
  | 'twitter'
  | null;

export type FullFeedback = {
  goodFeedback: string[];
  badFeedback: string[];
};

interface IProps {
  logo: Logos;
  feedback: FullFeedback;
  graphValues: number[];
  title: string;
}

const InsightBlock = (props: IProps) => {
  let logoComponent;
  let sideLength = 80;

  //decide which logo to display
  switch (props.logo) {
    case 'facebook':
      logoComponent = <FacebookIcon sideLength={sideLength} />;
      break;
    case 'twitter':
      logoComponent = <TwitterIcon sideLength={sideLength} />;
      break;
    case 'tiktok':
      logoComponent = <TikTokIcon sideLength={sideLength} />;
      break;
    case 'instagram':
      logoComponent = <InstagramIcon sideLength={sideLength} />;
      break;
    case 'linkedin':
      logoComponent = <LinkedInIcon sideLength={sideLength} />;
      break;
    default:
      // Default case if props.logo doesn't match any of the options (somehow)
      logoComponent = null;
  }

  //seperate props.feedback into objects to individual components to be displayed
  let goodFeedbackComponents = props.feedback.goodFeedback.map(
    (text, index) => {
      return (
        <InsightAlert key={`good-${index}`} alertType="good" text={text} />
      );
    }
  );
  let badFeedbackComponents = props.feedback.badFeedback.map((text, index) => {
    return <InsightAlert key={`bad-${index}`} alertType="bad" text={text} />;
  });

  console.log(goodFeedbackComponents);
  console.log(badFeedbackComponents);

  return (
    <div
      className={
        'relative flex h-80 w-full flex-row rounded-[1rem] border-[2px]'
      }
    >
      <div
        className={
          'flex h-full min-w-[400px] flex-col rounded-[1rem_0_0_1rem] bg-[#F8F8F8] p-[1.25em_1.25em_1.25em_1.5em]'
        }
      >
        <div className={'flex flex-row p-3'}>{logoComponent}</div>
        <div
          className={'p-[0.5rem_1rem] text-[1.1rem] font-[700] tracking-wide'}
        >
          {props.title}
        </div>
        <div
          className={
            'flex flex-row gap-[0.5rem] p-[1rem_0.75rem_0.4rem_0.75rem]'
          }
        >
          {badFeedbackComponents}
        </div>
        <div className={'flex flex-row gap-[0.5rem] pl-3'}>
          {goodFeedbackComponents}
        </div>
        <div className={'flex flex-row p-[1rem_0.75rem_0.75rem_0.75rem]'}>
          <button
            className={
              'rounded-[3rem] bg-[#8915E4] p-[0.3rem_0.9rem] text-[#FFFFFF]'
            }
            onClick={() => {
              console.log(`button for InsightBlock ${props.logo} clicked`);
            }}
          >
            Dismiss
          </button>
        </div>
      </div>

      {/*start of graph */}
      <div className={'flex w-full items-center justify-start pl-[12rem]'}>
        <InsightGraph activityValues={props.graphValues} />
      </div>

      {/*close button*/}
      <button
        className={'absolute right-[1.75rem] top-[1.75rem]'}
        onClick={() => {
          console.log('CLOSE!!!!!!!!!!!!!!!');
        }}
      >
        <CloseButtonIcon sideLength={30} />
      </button>
    </div>
  );
};

export default InsightBlock;
