import * as React from 'react';

interface IProps {
  sideLength: number;
}

const LinkedInIcon = (props: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.sideLength}
    height={props.sideLength}
    fill="none"
  >
    <rect
      width={props.sideLength}
      height={props.sideLength}
      fill="#BCD2E7"
      rx={5}
    />
    <path
      fill="#427CB2"
      d="M75.04 18H22.548C20.033 18 18 19.955 18 22.372v51.913c0 2.418 2.033 4.385 4.548 4.385H75.04c2.515 0 4.56-1.967 4.56-4.373V22.373c0-2.418-2.045-4.373-4.56-4.373ZM36.275 69.7h-9.143V40.74h9.143V69.7Zm-4.571-32.907c-2.936 0-5.306-2.334-5.306-5.213 0-2.88 2.37-5.214 5.306-5.214 2.923 0 5.293 2.334 5.293 5.214 0 2.867-2.37 5.213-5.293 5.213ZM70.492 69.7h-9.131V55.622c0-3.353-.06-7.678-4.753-7.678-4.752 0-5.474 3.661-5.474 7.441V69.7h-9.12V40.74h8.76v3.957h.12c1.215-2.275 4.198-4.68 8.638-4.68 9.252 0 10.96 5.995 10.96 13.792V69.7Z"
    />
  </svg>
);
export default LinkedInIcon;
