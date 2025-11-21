import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useCart } from "../hooks/useCart";
import CartDetail from "../components/CartDetail";
import EmptyCart from "../components/EmptyCart";
import Loading from "../components/Loading";

function CartPage() {
  const location = useLocation();
  const { cartItemsData, loading, resetPendingQuantities } = useCart();

  useEffect(
    function () {
      return function () {
        resetPendingQuantities();
      };
    },
    [resetPendingQuantities]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:px-8 pb-8">
      <Link to={location?.state?.from || "/"} className="self-end">
        <HiOutlineArrowNarrowLeft className="text-gray-800 text-3xl md:text-4xl" />
      </Link>
      <div className="flex-1 bg-white p-4">
        {cartItemsData.length > 0 && <CartDetail />}
        {cartItemsData.length == 0 && <EmptyCart />}
      </div>
    </div>
  );
}

export default CartPage;
