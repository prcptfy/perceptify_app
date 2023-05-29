'use client';

import React from 'react';

type IProps = {
  percentage: number;
};

const InsightBlock = (props: IProps) => {
  const leftBarColor: string = props.percentage > 0 ? '#4CAF50' : '#DB4437';

  return (
    <div className={'flex h-44 w-full flex-row rounded-[10px] bg-[#F8F8F8]'}>
      <div
        style={{ backgroundColor: `${leftBarColor}` }}
        className={'h-full w-[0.5rem] rounded-[10px_0px_0px_10px]'}
      ></div>
    </div>
  );
};

export default InsightBlock;
