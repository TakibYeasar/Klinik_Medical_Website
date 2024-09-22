import Image from "next/image";

const StatCard = ({ count = 0, label, icon, type }) => {
  // Define the background color classes based on type
  const backgroundColorClass = {
    appointments: "bg-green-500",
    pending: "bg-yellow-500",
    cancelled: "bg-red-500",
  }[type] || "bg-gray-500"; // Default to gray if type doesn't match

  return (
    <div className={`p-4 rounded-lg shadow-lg ${backgroundColorClass}`}>
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt={label}
          className="w-8 h-8" // Adjusted to use Tailwind CSS for size
        />
        <h2 className="text-2xl font-bold text-white">{count}</h2>
      </div>

      <p className="text-sm text-white">{label}</p>
    </div>
  );
};

export default StatCard;
