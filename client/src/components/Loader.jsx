export default function Loader({ full = false }) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-brand-200 border-t-brand-500" />
      <p className="text-sm font-medium text-gray-400">Loading…</p>
    </div>
  );

  if (full) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">{spinner}</div>
    );
  }
  return spinner;
}
