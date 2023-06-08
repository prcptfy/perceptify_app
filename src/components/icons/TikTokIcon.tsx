import Image from 'next/image';
import TikTok from './tiktok.svg';

interface IProps {
  sideLength: number;
}

const TikTokIcon = (props: IProps) => (
  <Image width={props.sideLength} src={TikTok} alt={'TikTok'} />
);
export default TikTokIcon;
