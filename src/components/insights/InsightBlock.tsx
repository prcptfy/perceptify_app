'use client';

import React from 'react';
import FacebookIcon from '../icons/FacebookIcon';
import TwitterIcon from '../icons/TwitterIcon';
import TikTokIcon from '../icons/TikTokIcon';
import InstagramIcon from '../icons/InstagramIcon';
import LinkedInIcon from '../icons/LinkedInIcon';

type Logos =
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'tiktok'
  | 'twitter'
  | null;

interface IProps {
  logo: Logos;
}

const InsightBlock = (props: IProps) => {
  let logoComponent;

  switch (props.logo) {
    case 'facebook':
      logoComponent = <FacebookIcon sideLength={97} />;
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

  return (
    <div
      className={
        'flex h-80 w-full flex-row rounded-[3rem] border-[2px] border-[#5E6366]'
      }
    >
      <div
        className={
          'flex h-full min-w-[500px] flex-col rounded-[3rem_0_0_3rem] bg-[#F8F8F8] p-5'
        }
      >
        <div className={'flex flex-row p-3'}>{logoComponent}</div>
        <div className={'pl-3 text-[1.5rem] font-[700]'}>
          Traffic Pattern Alert
        </div>
      </div>
    </div>
  );
};

export default InsightBlock;
