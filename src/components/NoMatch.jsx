import { memo, useCallback } from "react";
import noresultimage from "/images/noresult.svg";

function NoMatch({ searchQuery, onClearSearch }) {
  const handleClearSearch = useCallback(
    function () {
      onClearSearch();
    },
    [onClearSearch]
  );

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <img
        src={noresultimage}
        alt="No Results"
        className="opacity-80 w-40 h-40"
      />
      <h2 className="font-semibold text-gray-700 text-2xl">No Results Found</h2>
      <p className="mb-4 text-gray-500">
        We couldn't find any matches for{" "}
        <span className="font-medium text-gray-800">"{searchQuery}"</span>.
      </p>

      <button
        onClick={handleClearSearch}
        className="bg-primary-default hover:bg-primary-medium px-5 py-2 rounded-3xl font-medium text-white"
      >
        Clear Search
      </button>
    </div>
  );
}

export default memo(NoMatch);
