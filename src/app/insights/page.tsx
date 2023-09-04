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
      {/* div with a search bar on the right side */}
      <div className={'flex flex-row justify-between items-center'}>
        {/* div with an all/filter button */}
        <div className={'flex flex-row gap-[1em] items-center'}>
          <button
            className={
              'bg-[#8915E4] hover:bg-[#000] duration-150 rounded-md w-24 h-12 text-md text-white'
            }
          >
            All
          </button>
          <button
            className={
              'bg-[#8915E4] hover:bg-[#000] duration-150 rounded-md w-24 h-12 text-md text-white'
            }
          >
            Filter
          </button>
        </div>
        <div className={'flex flex-row gap-[1em] items-center'}>
          <input
            className={
              'bg-[#F5F5F5] px-8 rounded-md w-56 h-12 text-md text-gray-600'
            }
            placeholder={'Search'}
          />
        </div>
      </div>
      <div className={'flex flex-col overflow-y-scroll max-h-[calc(100vh-200px)]'}>
        {insightData.sections.map((section, idx) => {
          const { logo, feedback, graphValues, title, companyMembers } =
            section;
          return (
            <div key={idx} className='mr-12'>
              <InsightBlock
                logo={logo}
                feedback={feedback}
                graphValues={graphValues}
                title={title}
                companyMembers={companyMembers}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Insights;
