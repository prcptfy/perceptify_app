import React from 'react';
import Image from 'next/image';
import InstagramColor from './instagram.svg';
import InstagramGrey from './grey/instagram.svg'; 

interface IProps {
  grey?: boolean; 
  sideLength: number;
}

const InstagramIcon: React.FC<IProps> = (props: IProps) => {
  const { grey, sideLength } = props; 
  const iconToUse = grey ? InstagramGrey : InstagramColor; 

  return (
    <Image
      width={sideLength}
      height={sideLength}
      src={iconToUse}
      alt={'Instagram'}
    />
  );
};

export default InstagramIcon;
