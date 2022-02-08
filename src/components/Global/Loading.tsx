export function Loading(): JSX.Element {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 h-screen w-screen flex justify-center items-center z-10 bg-slate-800 bg-opacity-80">
      <p className="text-4xl text-white">Loading...</p>
    </div>
  );
}
