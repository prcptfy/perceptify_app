'use client';

import React from 'react';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';
import TikTokIcon from './icons/TikTokIcon';

type Logos = 'facebook' | 'twitter' | 'tiktok' | 'instagram' | 'linkedin';

type IProps = {
  percentage: number;
  logo: Logos;
};

const InsightBlock = (props: IProps) => {
  const leftBarColor: string = props.percentage > 0 ? '#4CAF50' : '#DB4437';
  let logoComponent;

  switch (props.logo) {
    case 'facebook':
      logoComponent = <FacebookIcon />;
      break;
    case 'twitter':
      logoComponent = <TwitterIcon />;
      break;
    case 'tiktok':
      logoComponent = <TikTokIcon />;
      break;
    case 'instagram':
      // logoComponent = <InstagramIcon />; ////no icon on figma
      break;
    case 'linkedin':
      // logoComponent = <LinkedInIcon />; //no icon on figma
      break;
    default:
      // Default case if props.logo doesn't match any of the options (somehow)
      logoComponent = null;
  }

  return (
    <div className={'flex h-44 w-full flex-row rounded-[10px] bg-[#F8F8F8]'}>
      <div
        style={{ backgroundColor: `${leftBarColor}` }}
        className={'h-full w-[0.5rem] rounded-[10px_0px_0px_10px]'}
      />
      <div className={'ml-[2.5rem] flex items-center'}>{logoComponent}</div>
      <div className={'flex items-center'}>
        <div
          className={
            'ml-[2.5em] h-[100px] w-[0.1rem] border-l-[2px] border-dashed border-l-[rgba(0,0,0,0.1)]'
          }
        />
      </div>
    </div>
  );
};

export default InsightBlock;
