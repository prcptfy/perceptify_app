'use client';

import { FiDownload } from 'react-icons/fi';
import { BiChevronDown } from 'react-icons/bi';
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
    <div
      className={
        '!relative mr-[-1.75rem] flex h-full  min-h-screen max-w-full flex-col gap-[1em] overflow-y-auto p-7'
      }
    >
      {/* div with a search bar on the right side */}
      <div
        className={
          'relative mt-[2.8rem] flex w-full max-w-[100%] flex-row items-center justify-between bg-white'
        }
      >
        {/* div with an all/filter button */}
        <div
          className={
            'flex flex-row items-center gap-[1em] rounded-xl bg-neutral-100 p-2'
          }
        >
          <button
            className={
              'text-md h-12 w-24 rounded-2xl bg-[#8915E4] text-white duration-150 hover:bg-[#000]'
            }
          >
            All
          </button>
          <button
            className={
              'text-md flex h-12 w-24 items-center justify-center gap-1 rounded-md bg-transparent text-black duration-150 '
            }
          >
            <p className="font-semibold">Filter</p>
            <BiChevronDown />
          </button>
        </div>
        <div className={'flex w-[50%] flex-row items-center  gap-[1em]'}>
          <button
            className={
              'text-md flex h-12 w-36 items-center justify-center  gap-1 rounded-2xl bg-neutral-100 text-black duration-150 '
            }
          >
            <p className="font-semibold">Sort</p>
            <BiChevronDown />
          </button>
          <input
            className={
              'text-md h-12 w-[100%] rounded-2xl bg-[#F5F5F5] px-8 text-gray-600'
            }
            placeholder={'Search'}
          />
          <button
            className={
              'text-md flex h-12 w-24 items-center justify-center  gap-1 rounded-2xl bg-neutral-100 text-black duration-150 '
            }
          >
            <FiDownload />
          </button>
        </div>
      </div>
      <div className={'flex h-full max-w-full flex-col'}>
        {insightData.sections.map((section, idx) => {
          const { logo, feedback, graphValues, title, companyMembers } =
            section;
          return (
            <div key={idx} className="">
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
