import { useCart } from "../hooks/useCart";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

function CartDetail() {
  const { updateCart } = useCart();

  return (
    <div className="flex flex-col">
      <div className="border border-gray-300 divide-y divide-gray-300">
        <div className="hidden sm:grid grid-cols-12 bg-gray-50 py-2 font-semibold text-black text-lg text-center">
          <div className="col-span-6 m-auto">
            <h2>Product</h2>
          </div>
          <h2 className="col-span-2">Price</h2>
          <h2 className="col-span-2">Quantity</h2>
          <h2 className="col-span-2">Subtotal</h2>
        </div>
        <CartList />
        <div className="flex md:flex-row flex-col justify-between gap-3 px-4 py-2">
          <div className="flex sm:flex-row flex-col items-start sm:items-center gap-2 w-full">
            <input
              type="text"
              placeholder="Coupon code"
              className="px-4 py-2 border border-gray-300 w-full md:w-auto text-black text-sm"
            />
            <button className="bg-primary-dark hover:bg-primary-extradark px-6 py-2 rounded w-full md:w-auto font-medium text-white text-sm">
              APPLY COUPON
            </button>
          </div>
          <button
            onClick={updateCart}
            className="bg-primary-light hover:bg-primary-default px-6 py-2 rounded w-full md:w-auto font-medium text-white text-sm"
          >
            UPDATE CART
          </button>
        </div>
      </div>
      <div className="self-end mt-2 md:mt-6 w-full">
        <CartTotals />
      </div>
    </div>
  );
}

export default CartDetail;
