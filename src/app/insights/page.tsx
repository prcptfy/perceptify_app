'use client';

import { FiDownload } from "react-icons/fi"
import { BiChevronDown } from "react-icons/bi"
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
    <div className={'flex flex-col gap-[1em] min-h-screen  max-w-full p-7 mr-[-1.75rem] h-full overflow-y-auto !relative'}>
      {/* div with a search bar on the right side */}
      <div className={'flex flex-row justify-between items-center mt-[2.8rem] bg-white max-w-[100%] relative w-full'}>
        {/* div with an all/filter button */}
        <div className={'flex flex-row gap-[1em] items-center bg-neutral-100 p-2 rounded-xl'}>
          <button
            className={
              'bg-[#8915E4] hover:bg-[#000] duration-150 rounded-2xl w-24 h-12 text-md text-white'
            }
          >
            All
          </button>
          <button
            className={
              'text-black flex items-center justify-center gap-1 bg-transparent duration-150 rounded-md w-24 h-12 text-md '
            }
          >
            <p className="font-semibold">Filter</p>
            <BiChevronDown />
          </button>
        </div>
        <div className={'flex flex-row gap-[1em] w-[50%]  items-center'}>
          <button
            className={
              'text-black flex items-center bg-neutral-100 justify-center gap-1  duration-150 rounded-2xl w-36 h-12 text-md '
            }
          >
            <p className="font-semibold">Sort</p>
            <BiChevronDown />
          </button>
          <input
            className={
              'bg-[#F5F5F5] px-8 rounded-2xl w-[100%] h-12 text-md text-gray-600'
            }
            placeholder={'Search'}
          />
          <button
            className={
              'text-black flex items-center bg-neutral-100 justify-center gap-1  duration-150 rounded-2xl w-24 h-12 text-md '
            }
          >
            <FiDownload />
          </button>

        </div>
      </div>
      <div className={'flex flex-col h-full max-w-full'}>
        {insightData.sections.map((section, idx) => {
          const { logo, feedback, graphValues, title, companyMembers } =
            section;
          return (
            <div key={idx} className=''>
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
