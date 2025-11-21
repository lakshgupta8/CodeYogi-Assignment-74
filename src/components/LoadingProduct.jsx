import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

function LoadingProduct() {
  const location = useLocation();
  return (
    <div className="flex flex-col md:px-8 pb-8">
      <Link
        to={location?.state?.from === "cart" ? "/cart" : "/"}
        className="self-end"
      >
        <HiOutlineArrowNarrowLeft className="text-gray-800 text-3xl md:text-4xl" />
      </Link>

      <div className="flex md:flex-row flex-col gap-3 bg-white px-4 md:px-8 py-6">
        <div className="flex justify-center items-center bg-gray-100 w-full md:w-1/2 h-96">
          <div className="bg-gray-200 rounded-md w-full h-full animate-pulse" />
        </div>

        <div className="flex flex-col px-2 md:px-8 w-full md:w-1/2 overflow-auto">
          <div className="flex-1">
            <div className="bg-gray-200 mb-6 md:mb-10 rounded w-3/4 h-8 md:h-12 animate-pulse" />
            <div className="bg-gray-200 mb-4 rounded w-1/4 h-6 md:h-8 animate-pulse" />
            <div className="bg-gray-200 mb-2 rounded w-full h-4 animate-pulse" />
            <div className="bg-gray-200 mb-2 rounded w-5/6 h-4 animate-pulse" />
            <div className="bg-gray-200 mb-6 rounded w-2/3 h-4 animate-pulse" />
            <div className="bg-gray-200 mb-6 rounded w-1/3 h-4 animate-pulse" />
          </div>

          <div className="flex justify-between mt-6 md:mt-10">
            <div className="flex flex-col items-center gap-1">
              <div className="bg-gray-200 rounded w-8 md:w-10 h-8 md:h-10 animate-pulse" />
              <div className="bg-gray-200 rounded w-16 md:w-20 h-4 md:h-5 animate-pulse" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="bg-gray-200 rounded w-8 md:w-10 h-8 md:h-10 animate-pulse" />
              <div className="bg-gray-200 rounded w-16 md:w-20 h-4 md:h-5 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingProduct;
