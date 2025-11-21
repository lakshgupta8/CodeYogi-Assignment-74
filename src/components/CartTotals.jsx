import { memo } from "react";
import { useCart } from "../hooks/useCart";

function CartTotals() {
  const { subtotal } = useCart();
  return (
    <div className="md:ml-auto border border-gray-300 md:w-2/5 text-gray-800">
      <div className="bg-gray-50 px-4 border-gray-300 border-b">
        <h2 className="font-semibold text-lg">Cart totals</h2>
      </div>
      <div className="mt-2 px-4 divide-y divide-gray-300">
        <div className="flex py-2">
          <span className="w-1/2">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex py-2">
          <span className="w-1/2">Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="py-4">
          <button className="bg-primary-default hover:bg-primary-medium px-4 py-3 rounded w-full font-semibold text-white">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(CartTotals);
