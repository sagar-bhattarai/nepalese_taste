const StatCard = ({ title, value, icon }) => {
  return (
    <div className="w-full bg-gray-100/40 dark:bg-gray-900 rounded-md shadow-md">
      <div className="flex items-center justify-between gap-2 p-2">
        <p className="text-gray-500 text-xs text-wrap w-max">{title}</p>
        <h2 className="text-xs font-bold text-slate-400 w-max">{value || "N/A"}</h2>
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
  );
};

export default StatCard;