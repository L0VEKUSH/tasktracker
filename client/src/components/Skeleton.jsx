export function SkeletonStatCard() {
  return (
    <div className="card p-5">
      <div className="skeleton mb-3 h-4 w-24 rounded" />
      <div className="skeleton h-8 w-16 rounded" />
    </div>
  );
}

export function SkeletonTaskCard() {
  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="skeleton h-5 w-1/3 rounded" />
        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
      <div className="skeleton mb-2 h-3 w-full rounded" />
      <div className="skeleton mb-4 h-3 w-2/3 rounded" />
      <div className="flex justify-between">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-3 w-16 rounded" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonTaskCard key={i} />
      ))}
    </div>
  );
}
