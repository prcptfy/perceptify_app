import Link from 'next/link';

export default function Topbar() {
  return (
    <>
      {/* <div className='absolute -z-10 h-[40vh] w-screen bg-[#8915E4]'></div> */}
      <div className="sticky top-0 z-50 flex items-center p-3 px-6 gap-5 bg-purple-500">
        <div className="font-semibold text-purple-300 mr-3">Perceptify</div>

        <div className="h-px w-full bg-purple-400"></div>

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
        </div>
      </div>
    </>
  );
}
