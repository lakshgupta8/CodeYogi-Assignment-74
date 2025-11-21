import { memo, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import { useCart } from "../hooks/useCart";

function CartRow({ item }) {
  const { updateQuantity, removeFromCart, getItemSubtotal, cartItems } = useCart();
  const quantity = item.quantity ?? 1;
  const savedQuantity = cartItems[item.id] ?? item.quantity ?? 1;
  const subtotal = useMemo(
    function () {
      const result = getItemSubtotal(item.price, savedQuantity);
      return result ?? 0;
    },
    [getItemSubtotal, item.price, savedQuantity]
  );

  const handleChange = useCallback(
    function (event) {
      const val = event.target.value;
      const num = Number(val);
      updateQuantity(item.id, num);
    },
    [updateQuantity, item.id]
  );

  const handleRemove = useCallback(
    function () {
      removeFromCart(item.id);
    },
    [removeFromCart, item.id]
  );

  return (
    <div className="flex flex-col items-center gap-4 sm:grid grid-cols-12 px-4 py-3 font-medium text-gray-800 text-center">
      <button
        className="hidden sm:block col-span-1 text-gray-400 hover:text-gray-600 text-2xl"
        onClick={handleRemove}
      >
        <TiDeleteOutline />
      </button>

      <div className="col-span-5 w-full">
        <div className="sm:hidden flex justify-center mb-3">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-20 h-20 object-contain"
          />
        </div>

        <Link
          to={"/product/" + item.id}
          state={{ from: "cart" }}
          className="hidden sm:flex items-center gap-4 md:gap-6"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-20 h-20 object-contain"
          />
          <span className="text-primary-default text-start">{item.title}</span>
        </Link>

        <div className="sm:hidden space-y-2">
          <div className="flex justify-between">
            <span className="mr-2 font-semibold">Product</span>
            <span className="text-primary-default text-end">{item.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Price</span>
            <span>${item.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Quantity</span>
            <input
              type="number"
              min="0"
              value={quantity}
              onChange={handleChange}
              className="px-2 py-1 border border-gray-300 w-16 text-center"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="hidden sm:block col-span-2 text-center">
        <div>${item.price.toFixed(2)}</div>
      </div>

      <div className="hidden sm:block col-span-2 text-center">
        <input
          type="number"
          value={quantity}
          className="px-2 py-1 border border-gray-300 w-12 sm:w-16 text-center"
          onChange={handleChange}
        />
      </div>

      <div className="hidden sm:block col-span-2 text-center">
        <div>${subtotal.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default memo(CartRow);
