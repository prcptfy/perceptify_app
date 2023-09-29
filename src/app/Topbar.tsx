'use client'

import Link from 'next/link';
import { useSupabase } from '@/components/supabase-provider';

export default function Topbar() {
  const { supabase, session } = useSupabase();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      {/* <div className='absolute -z-10 h-[40vh] w-screen bg-[#8915E4]'></div> */}
      <div className="sticky top-0 z-50 flex items-center p-3 px-6 gap-5 bg-purple-450">
        <div className="font-semibold text-purple-450-300 mr-3">Perceptify</div>

        <div className="h-px w-full bg-purple-450-400"></div>

        <div className="flex text-gray-50 gap-2">
          <Link
            className="p-2 px-4 hover:bg-slate-900 transition-colors rounded-md"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="p-2 px-4 hover:bg-slate-900 transition-colors rounded-md"
            href="/analytics"
          >
            Analytics
          </Link>
          <Link
            className="p-2 px-4 hover:bg-slate-900 transition-colors rounded-md"
            href="/clusters"
          >
            Clusters
          </Link>
          <Link
            className="p-2 px-4 hover:bg-slate-900 transition-colors rounded-md"
            href="/register"
          >
            Register
          </Link>
          {session ? <button
            className="p-2 px-4 hover:bg-slate-900 transition-colors rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button> :
          <Link
            className="p-2 px-4 hover:bg-slate-900 transition-colors rounded-md"
            href="/login"
          >
            Login
          </Link>}
        </div>
      </div>
    </>
  );
}
