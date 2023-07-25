import Image from 'next/image';
import Facebook from './facebook.svg';

interface IProps {
  sideLength: number;
}

const FacebookIcon = (props: IProps) => (
  <Image width={props.sideLength} src={Facebook} alt={'facebook'} />
);
export default FacebookIcon;
