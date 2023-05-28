'use client';

import InsightBlock from '@/components/InsightBlock';
import Sidebar from '@/components/sidebar/Sidebar';
import './insights.css';

const Insights = () => {
  return (
    <>
      <Sidebar />
      <div className="insights">
        <InsightBlock />
        <InsightBlock />
        <InsightBlock />
      </div>
    </>
  );
};

export default Insights;
