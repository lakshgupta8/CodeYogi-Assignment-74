import { memo, useMemo } from "react";
import { useCart } from "../hooks/useCart";
import CartRow from "./CartRow";

function CartList() {
  const { cartItemsData } = useCart();

  const rows = useMemo(
    function () {
      return cartItemsData.map(function (item) {
        return <CartRow key={item.id} item={item} />;
      });
    },
    [cartItemsData]
  );

  return (
    <div className="bg-white overflow-hidden">
      <div className="divide-y divide-gray-300">{rows}</div>
    </div>
  );
}

export default memo(CartList);
