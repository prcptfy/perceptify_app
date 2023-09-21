import Image from 'next/image';
import Facebook from './facebook.svg';
import GreyFacebook from './grey/facebook.svg';

interface IProps {
  sideLength: number;
  grey?: boolean;
}

const FacebookIcon: React.FC<IProps> = ({ sideLength, grey }) => (
  <Image 
    width={sideLength} 
    height={sideLength}
    src={grey ? GreyFacebook : Facebook} 
    alt={'facebook'} 
  />
);

export default FacebookIcon;
