'use client';

import React from 'react';
import FacebookIcon from '../icons/FacebookIcon';
import TwitterIcon from '../icons/TwitterIcon';
import TikTokIcon from '../icons/TikTokIcon';
import InstagramIcon from '../icons/InstagramIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import InsightAlert from './InsightAlert';
import InsightGraph from './InsightGraph';

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
}

const InsightBlock = (props: IProps) => {
  let logoComponent;

  //decide which logo to display
  switch (props.logo) {
    case 'facebook':
      logoComponent = <FacebookIcon sideLength={80} />;
      break;
    case 'twitter':
      logoComponent = <TwitterIcon sideLength={97} />;
      break;
    case 'tiktok':
      logoComponent = <TikTokIcon sideLength={97} />;
      break;
    case 'instagram':
      logoComponent = <InstagramIcon sideLength={97} />;
      break;
    case 'linkedin':
      logoComponent = <LinkedInIcon sideLength={97} />;
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
    <div className={'flex h-80 w-full flex-row rounded-[1rem] border-[2px]'}>
      <div
        className={
          'flex h-full min-w-[400px] flex-col rounded-[1rem_0_0_1rem] bg-[#F8F8F8] p-[1.25em_1.25em_1.25em_1.5em]'
        }
      >
        <div className={'flex flex-row p-3'}>{logoComponent}</div>
        <div className={'pl-3 text-[1.5rem] font-[700]'}>
          Traffic Pattern Alert
        </div>
        <div
          className={
            'flex flex-row gap-[0.5rem] p-[0.75rem_0.75rem_0.5rem_0.75rem]'
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
              'rounded-[3rem] bg-[#8915E4] p-[0.2rem_0.8rem] text-[#FFFFFF]'
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
      <div className={'flex w-full items-center justify-center'}>
        <InsightGraph activityValues={[10, 3, 6, 7, 17, 5, 1]} />
      </div>
    </div>
  );
};

export default InsightBlock;
