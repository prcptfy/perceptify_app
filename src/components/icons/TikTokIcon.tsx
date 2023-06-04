import * as React from 'react';

interface IProps {
  sideLength: number;
}

const TikTokIcon = (props: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.sideLength}
    height={props.sideLength}
    fill="none"
  >
    <rect
      width={props.sideLength}
      height={props.sideLength}
      fill="#000"
      rx={5}
    />
    <path
      fill="#fff"
      d="M60.056 19h-9.944v39.585c0 4.716-3.824 8.59-8.584 8.59s-8.584-3.874-8.584-8.59c0-4.632 3.74-8.423 8.33-8.59v-9.94C31.158 40.226 23 48.395 23 58.586c0 10.275 8.33 18.529 18.613 18.529 10.284 0 18.613-8.338 18.613-18.53V38.288a23.258 23.258 0 0 0 13.174 4.38v-9.939C65.92 32.476 60.056 26.412 60.056 19Z"
    />
  </svg>
);
export default TikTokIcon;
