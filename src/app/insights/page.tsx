'use client';

import InsightBlock from '@/components/insights/InsightBlock';
import { FullFeedback } from '@/components/insights/InsightBlock';

const Insights = () => {
  const facebookFeedback: FullFeedback = {
    goodFeedback: ['Post more on Wednesdays'],
    badFeedback: ['Low activity'],
  };
  const tiktokFeedback: FullFeedback = {
    goodFeedback: ['Public Relations Control'],
    badFeedback: ['Negative Sentiment'],
  };

  const companyMembers: string[] = [
    'Alex Z.',
    'Bill X.',
    'Suyogya P.',
    'Aleks D.',
    'Kevin Z.',
    'Gene I.',
  ];

  return (
    <div className={'flex flex-col gap-[1em]'}>
      <div className={'flex flex-col gap-[2em]'}>
        <InsightBlock
          logo={'facebook'}
          feedback={facebookFeedback}
          graphValues={[10, 15, 27, 25, 13, 8, 3]}
          title={'Traffic Pattern Alert'}
          companyMembers={companyMembers}
        />
        <InsightBlock
          logo={'tiktok'}
          feedback={tiktokFeedback}
          graphValues={[10, 15, 27, 25, 13, 8, 3]}
          title={'Sentiment Alert'}
          companyMembers={companyMembers}
        />
      </div>
    </div>
  );
};

export default Insights;
