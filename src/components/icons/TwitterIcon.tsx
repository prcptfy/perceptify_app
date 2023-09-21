import Image from 'next/image';
import TwitterColor from './twitter.svg';
import TwitterGrey from './grey/twitter.svg';  

interface IProps {
  grey?: boolean;
  sideLength: number;
}

const TwitterIcon: React.FC<IProps> = ({ grey, sideLength }) => {
  const iconToUse = grey ? TwitterGrey : TwitterColor;
  return <Image width={sideLength} height={sideLength} src={iconToUse} alt={'Twitter'} />;
};

export default TwitterIcon;