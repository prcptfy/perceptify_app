'use client';

/*

TODOS

Make full functionality of Assign dropdown

Create assigned to catagory after Register stages are done

*/

import React, { Suspense, useState } from 'react';
import FacebookIcon from '../icons/FacebookIcon';
import TwitterIcon from '../icons/TwitterIcon';
import TikTokIcon from '../icons/TikTokIcon';
import InstagramIcon from '../icons/InstagramIcon';
// import LinkedInIcon from '../icons/LinkedInIcon';
import InsightAlert from './InsightAlert';
import InsightGraph from './InsightGraph';
import CloseButtonIcon from '../icons/closeButtonIcon';
import './InsightBlock.css';
import { Spinner } from '@nextui-org/react';

type Logos =
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'tiktok'
  | 'twitter'
  | string
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
  companyMembers: string[];
}

const InsightBlock = (props: IProps) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [isClosed, setIsClosed] = useState<boolean>(false);

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
      // logoComponent = <LinkedInIcon sideLength={sideLength} />;
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

  //create dropdown options
  const dropdownOptions = props.companyMembers.map((member) => {
    return (
      <option value={member} key={member}>
        {member}
      </option>
    );
  });

  return (
    <Suspense fallback={<Spinner size="lg" color="secondary" />}>
      <div
        className={`relative flex h-80 w-full max-w-full flex-row rounded-[1rem] border-[2px] duration-150 ease-in-out hover:cursor-pointer hover:border-[#8915E4]
          ${isClosed ? 'fade-out my-0' : 'fade-in my-[1em]'}`}
      >
        <div
          className={
            'flex h-full max-w-[30%] flex-col rounded-[1rem_0_0_1rem] bg-[#F8F8F8] py-3 px-9'
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
          <div
            className={
              'flex flex-row gap-[0.5rem] p-[1rem_0.75rem_0.75rem_0.75rem]'
            }
          >
            <button
              className={
                'rounded-[3rem] bg-[#8915E4] p-[0.3rem_0.9rem] font-[700] text-[#FFFFFF] transition-[background-color] duration-150 ease-[ease-in-out] hover:cursor-pointer hover:bg-[#2D2D2D]'
              }
              onClick={() => {
                console.log(`button for InsightBlock ${props.logo} clicked`);
                setIsClosed(true);
              }}
            >
              Dismiss
            </button>
            <select
              className="rounded-[3rem] border-2 border-[#8915E4] bg-[#FFFFFF] p-0 text-center font-[500] text-[#2D2D2D] outline-0 ring-0 transition-[border-color] duration-150 ease-[ease-in-out] hover:cursor-pointer hover:border-[#2D2D2D]"
              id={'assign'}
              value={selectedOption}
              onChange={(event) => {
                setSelectedOption(event.target.value);
              }}
            >
              <option value="" disabled hidden selected>
                Assign
              </option>
              {dropdownOptions}
            </select>
          </div>
        </div>

        {/*start of graph */}
        <div
          className={
            'ml-16 mr-16 flex w-full max-w-[50%] items-center justify-start'
          }
        >
          <InsightGraph activityValues={props.graphValues} />
        </div>

        {/*close button*/}
        <button
          className={'absolute right-[1.75rem] top-[1.75rem] bg-transparent'}
          onClick={() => {
            console.log('x button clicked.');
            setIsClosed(true);
          }}
        >
          <CloseButtonIcon sideLength={30} />
        </button>
      </div>
    </Suspense>
  );
};

export default InsightBlock;
