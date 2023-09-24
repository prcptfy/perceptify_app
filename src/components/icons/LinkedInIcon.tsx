import React from 'react';
import Image from 'next/image';
import LinkedinColor from './linkedin.svg';
import LinkedinGrey from './grey/linkedin.svg'; 

interface IProps {
  grey?: boolean; 
  sideLength: number;
}

const LinkedinIcon: React.FC<IProps> = (props: IProps) => {
  const { grey, sideLength } = props; 
  const iconToUse = grey ? LinkedinGrey : LinkedinColor; 

  return (
    <Image
      width={sideLength}
      height={sideLength}
      src={iconToUse}
      alt={'linkedin'}
    />
  );
};

export default LinkedinIcon;
