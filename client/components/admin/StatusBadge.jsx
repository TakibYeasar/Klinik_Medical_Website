import Image from "next/image";
import { StatusIcon } from "../../constants";

// Define the types for status
const statusColors = {
  scheduled: {
    bgColor: "bg-green-600",
    textColor: "text-green-500",
  },
  pending: {
    bgColor: "bg-blue-600",
    textColor: "text-blue-500",
  },
  cancelled: {
    bgColor: "bg-red-600",
    textColor: "text-red-500",
  },
};

const StatusBadge = ({ status }) => {
  const { bgColor, textColor } = statusColors[status] || {
    bgColor: "bg-gray-500",
    textColor: "text-gray-500",
  };

  return (
    <div className={`flex items-center gap-2 p-2 rounded-lg ${bgColor}`}>
      <Image
        src={StatusIcon[status]}
        alt="status icon"
        width={24}
        height={24}
        className="h-6 w-6" // Adjust size as needed
      />
      <p className={`text-sm font-semibold capitalize ${textColor}`}>
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;