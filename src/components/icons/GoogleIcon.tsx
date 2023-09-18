import Image from 'next/image';
import Google from './google.svg';
import GreyGoogle from './grey/google.svg';

interface IProps {
  sideLength: number;
  grey?: boolean;
}

const GoogleIcon: React.FC<IProps> = ({ sideLength, grey }) => (
  <Image 
    width={sideLength} 
    height={sideLength}
    src={grey ? GreyGoogle : Google} 
    alt={'google'} 
  />
);

export default GoogleIcon;
