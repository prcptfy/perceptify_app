'use client';

import InsightBlock from '@/components/insights/InsightBlock';
import { FullFeedback } from '@/components/insights/InsightBlock';

const Insights = () => {
  //TODO: make delete buttons make insight blocks dissappear in this file, have discarded blocks stored elsewere. confer with me on slack abt how to do this

  const facebookFeedback: FullFeedback = {
    goodFeedback: ['Post more on Wednesdays'],
    badFeedback: ['Low activity'],
  };
  const tiktokFeedback: FullFeedback = {
    goodFeedback: ['Public Relations Control'],
    badFeedback: ['Negative Sentiment'],
  };

  const companyMembers: string[] = [
    'Alex Z.', // 🤓
    'Bill X.',
    'Suyogya P.',
    'Aleks D.',
    'Kevin Z.',
    'Gene I.',
    'Ashish V.', // yawn
  ];

  const insightData = {
    sections: [
      {
        logo: 'facebook',
        feedback: facebookFeedback,
        graphValues: [10, 15, 27, 25, 13, 8, 3],
        title: 'Traffic Pattern Alert',
        companyMembers: companyMembers,
      },
      {
        logo: 'tiktok',
        feedback: tiktokFeedback,
        graphValues: [12, 18, 12, 10, 7, 4, 2],
        title: 'Engagement Analysis',
        companyMembers: companyMembers,
      },
      {
        logo: 'tiktok',
        feedback: tiktokFeedback,
        graphValues: [12, 18, 12, 10, 7, 4, 2],
        title: 'Engagement Analysis',
        companyMembers: companyMembers,
      },
      {
        logo: 'tiktok',
        feedback: tiktokFeedback,
        graphValues: [12, 18, 12, 10, 7, 4, 2],
        title: 'Engagement Analysis',
        companyMembers: companyMembers,
      },
      {
        logo: 'tiktok',
        feedback: tiktokFeedback,
        graphValues: [12, 18, 12, 10, 7, 4, 2],
        title: 'Engagement Analysis',
        companyMembers: companyMembers,
      },
    ],
  };

  return (
    <div className={'flex flex-col gap-[1em]'}>
      1!
      <div className={'flex flex-col'}>
        {insightData.sections.map((section) => {
          const { logo, feedback, graphValues, title, companyMembers } =
            section;
          return (
            <InsightBlock
              logo={logo}
              feedback={feedback}
              graphValues={graphValues}
              title={title}
              companyMembers={companyMembers}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Insights;
