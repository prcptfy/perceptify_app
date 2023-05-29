'use client';

import InsightBlock from '@/components/InsightBlock';

const Insights = () => {
  return (
    <div className={'flex flex-col gap-[2em]'}>
      <InsightBlock percentage={15} />
      <InsightBlock percentage={-15} />
    </div>
  );
};

export default Insights;
