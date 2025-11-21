import { memo } from "react";
import { Link } from "react-router-dom";
import emptycartimage from "/images/emptycart.svg";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-4 mb-32 text-center">
      <img
        src={emptycartimage}
        alt="No Products"
        className="opacity-80 w-40 h-40"
      />
      <h2 className="font-semibold text-gray-700 text-2xl">Cart Is Empty</h2>
      <p className="mb-4 text-gray-500">
        Try adding a product to the cart from the product listing or product
        details page.
      </p>

      <Link
        to="/"
        className="bg-primary-default hover:bg-primary-medium mt-6 px-5 py-2 rounded-3xl font-medium text-white"
      >
        EXPLORE PRODUCTS
      </Link>
    </div>
  );
}

export default memo(EmptyCart);
