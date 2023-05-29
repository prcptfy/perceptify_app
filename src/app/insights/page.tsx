'use client';

import InsightBlock from '@/components/InsightBlock';

const Insights = () => {
  return (
    <div className={'flex flex-col gap-[1em]'}>
      <div className={'flex flex-col gap-[2em]'}>
        <InsightBlock percentage={15} logo={'tiktok'} />
        <InsightBlock percentage={-15} logo={'facebook'} />
      </div>
    </div>
  );
};

export default Insights;
