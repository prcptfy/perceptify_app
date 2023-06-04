'use client';

import InsightBlock from '@/components/insights/InsightBlock';
import FacebookIcon from '@/components/icons/FacebookIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';

const Insights = () => {
  return (
    <div className={'flex flex-col gap-[1em]'}>
      <div className={'flex flex-col gap-[2em]'}>
        <InsightBlock logo={'facebook'} />
      </div>
    </div>
  );
};

export default Insights;
