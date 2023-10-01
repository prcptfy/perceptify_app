export default function NicePageContent({
  title,
  children,
}: {
  title: String;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="absolute top-0 left-0 z-0 h-72 w-full bg-purple-450 shadow-lg"></div>
      <h2 className="relative my-6 text-4xl font-bold text-white">{title}</h2>
      <div className="relative z-10 rounded-lg bg-white p-5 shadow-lg">
        {children}
      </div>
    </>
  );
}
