import Image from 'next/image';
import LinkedIn from './linkedin.svg';

interface IProps {
  sideLength: number;
}

const LinkedInIcon = (props: IProps) => (
  <Image width={props.sideLength} src={LinkedIn} alt={'LinkedIn'} />
);
export default LinkedInIcon;
