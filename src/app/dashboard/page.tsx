import Graph from './Graph';

export default function Page() {
  return (
    <>
      <div className="absolute top-0 left-0 z-0 h-72 w-full bg-purple-500 shadow-lg"></div>
      <h2 className="relative my-6 text-4xl font-bold text-white">Dashboard</h2>
      <div className="relative z-10 h-screen rounded-lg bg-white p-5 shadow-lg">
        <div
          className="flex gap-3 rounded-md border border-dashed border-gray-300 p-3"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              #d5d5d5,
              #d5d5d5 1px,
              transparent 1px,
              transparent 5px
            )`,
          }}
        >
          <div className="h-72 w-fit rounded-md bg-white p-5 px-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
            <Graph />
          </div>
          <div className="h-72 w-fit rounded-md bg-white p-5 px-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
            <Graph />
          </div>
        </div>
        This is a dashboard
      </div>
    </>
  );
}
