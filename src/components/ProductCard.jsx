import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

function ProductCard({
  id,
  title,
  category,
  price,
  discountPercentage,
  thumbnail,
  rating,
}) {
  const originalPrice = useMemo(
    function () {
      if (discountPercentage === 0 || discountPercentage == null) return null;
      return (price * 100) / (100 - discountPercentage);
    },
    [price, discountPercentage]
  );

  return (
    <Link to={"/product/" + id} state={{ from: "home" }}>
      <div className="flex flex-col bg-white">
        <div className="bg-gray-100 mb-3">
          <img src={thumbnail} alt={title} className="w-full object-contain" />
        </div>

        <p className="mt-1 text-gray-400 text-sm">{category}</p>
        <h3 className="mt-1 font-semibold text-gray-800">{title}</h3>
        <StarRating rating={rating} />
        <div className="flex gap-2 mt-2 mb-2">
          {originalPrice && (
            <span className="text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          <span className="font-bold text-primary-dark">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
