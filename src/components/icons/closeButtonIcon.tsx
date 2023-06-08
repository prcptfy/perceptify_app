import Image from 'next/image';
import Close from './close.svg';

interface IProps {
  sideLength: number;
}

const CloseButtonIcon = (props: IProps) => (
  <Image width={props.sideLength} src={Close} alt={'close'} />
);
export default CloseButtonIcon;
