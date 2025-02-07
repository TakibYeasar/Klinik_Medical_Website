import Image from "next/image";

const SubmitButton = ({ isLoading, className, children }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-2 px-4 rounded-md font-semibold text-white ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
