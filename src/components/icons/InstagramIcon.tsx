import Image from 'next/image';
import Instagram from './instagram.svg';

interface IProps {
  sideLength: number;
}

const InstagramIcon = (props: IProps) => (
  <Image width={props.sideLength} src={Instagram} alt={'Instagram'} />
);
export default InstagramIcon;
