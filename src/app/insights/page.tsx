'use client';

import InsightBlock from '@/components/insights/InsightBlock';
import { FullFeedback } from '@/components/insights/InsightBlock';

const Insights = () => {
  const facebookFeedback: FullFeedback = {
    goodFeedback: ['Post more on Wednesdays'],
    badFeedback: ['Low activity'],
  };
  const tiktokFeedback: FullFeedback = {
    goodFeedback: ['Post more on Mondays'],
    badFeedback: ['Low engagement with 55-60 year olds'],
  };

  return (
    <div className={'flex flex-col gap-[1em]'}>
      <div className={'flex flex-col gap-[2em]'}>
        <InsightBlock logo={'facebook'} feedback={facebookFeedback} />
        <InsightBlock logo={'tiktok'} feedback={tiktokFeedback} />
      </div>
    </div>
  );
};

export default Insights;
