import * as React from 'react';

interface IProps {
  sideLength: number;
}

const FacebookIcon = (props: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.sideLength}
    height={props.sideLength}
    fill="none"
  >
    <rect
      width={props.sideLength}
      height={props.sideLength}
      fill="#4267B2"
      fillOpacity={0.3}
      rx={5}
    />
    <path
      fill="#4267B2"
      d="M82 48.204C82 29.861 67.218 15 49 15c-18.23 0-33 14.861-33 33.204C16 64.774 28.064 78.512 43.844 81V57.805h-8.38v-9.599h8.38v-7.319c0-8.32 4.919-12.915 12.46-12.915 3.61 0 7.391.648 7.391.648v8.17h-4.168c-4.092 0-5.37 2.563-5.37 5.189v6.225h9.15l-1.47 9.599h-7.68v23.195C69.923 78.51 82 64.77 82 48.202v.002Z"
    />
  </svg>
);
export default FacebookIcon;
