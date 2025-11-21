import { memo } from "react";
import { ImSpinner9 } from "react-icons/im";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center mb-22 py-12">
      <ImSpinner9 className="opacity-75 text-primary-medium text-3xl animate-spin" />
      <p className="mt-3 text-gray-600 text-sm">Loading ...</p>
    </div>
  );
}

export default memo(Loading);
