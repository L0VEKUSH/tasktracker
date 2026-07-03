export default function StatCard({ label, value, icon: Icon, gradient }) {
  return (
    <div className="card card-hover p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{label}</p>
          <p className="mt-1 text-3xl font-extrabold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${gradient}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
