import Image from 'next/image';
import TikTokColor from './tiktok.svg';
import TikTokGrey from './grey/tiktok.svg';  

interface IProps {
  grey?: boolean;
  sideLength: number;
}

const TikTokIcon: React.FC<IProps> = ({ grey, sideLength }) => {
  const iconToUse = grey ? TikTokGrey : TikTokColor;
  return <Image width={sideLength} height={sideLength} src={iconToUse} alt={'TikTok'} />;
};

export default TikTokIcon;