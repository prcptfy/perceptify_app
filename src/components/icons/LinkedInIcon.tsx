import Image from 'next/image';
import TikTok from './tiktok.svg';
import GreyTikTok from './grey/tiktok.svg';

interface IProps {
  sideLength: number;
  grey?: boolean;
}

const TikTokIcon: React.FC<IProps> = ({ sideLength, grey }) => (
  <Image 
    width={sideLength} 
    height={sideLength} 
    src={grey ? GreyTikTok : TikTok} 
    alt={'TikTok'} 
  />
);

export default TikTokIcon;
