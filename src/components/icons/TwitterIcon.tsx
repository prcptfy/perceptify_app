import Image from 'next/image';
import Twitter from './twitter.svg';

interface IProps {
  sideLength: number;
}

const TwitterIcon = (props: IProps) => (
  <Image width={props.sideLength} src={Twitter} alt={'Twitter'} />
);
export default TwitterIcon;
