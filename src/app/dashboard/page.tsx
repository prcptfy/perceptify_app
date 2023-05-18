'use client';

import NicePageContent from '@/components/NiceContent';
import Graph from './Graph';
import Sidebar from '@/components/sidebar/Sidebar';
import { useSupabase } from '@/components/supabase-provider';
import { useEffect, useState } from 'react';

export default function Page() {
  const { supabase } = useSupabase();
  const [data2, setData] = useState<any | null>(null);

  useEffect(() => {
    supabase
      .from('notes')
      .select()
      .then(({ data, error }) => setData(data));
  }, []);

  return (
    <div>
      <Sidebar />
    </div>
  );
  // return (
  //   <div
  //     className="flex gap-3 rounded-md border border-dashed border-gray-300 p-3"
  //     style={{
  //       background: `repeating-linear-gradient(
  //         45deg,
  //         #d5d5d5,
  //         #d5d5d5 1px,
  //         transparent 1px,
  //         transparent 5px
  //       )`,
  //     }}
  //   >
  //     <div className="h-72 w-fit rounded-md bg-white p-5 px-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
  //       <Graph />
  //     </div>
  //     <div className="h-72 w-fit rounded-md bg-white p-5 px-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
  //       <Graph />
  //     </div>
  //   </div>
  // )
}
