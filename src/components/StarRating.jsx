import { memo, useMemo } from "react";
import { Star } from "lucide-react";

function StarRating({ rating }) {
  const fills = useMemo(
    function () {
      return [...Array(5)].map(function (_, index) {
        return Math.min(Math.max(rating - index, 0), 1) * 100;
      });
    },
    [rating]
  );

  return (
    <div className="flex gap-1">
      {fills.map(function (fillPercentage, index) {
        return (
          <div key={index} className="relative">
            <Star className="w-4 h-4 text-primary-light" />
            <div
              className="top-0 left-0 absolute overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star className="fill-primary-default w-4 h-4 text-primary-dark" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(StarRating);
