import { useState, useMemo, useCallback, useEffect } from "react";
import { getProduct } from "../api";
import { CartContext } from "./CartContext.js";

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [pendingQuantities, setPendingQuantities] = useState({});
  const [cartItemsData, setCartItemsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemIds = useMemo(() => Object.keys(cartItems), [cartItems]);

  const count = useMemo(
    () => Object.values(cartItems).reduce((sum, qty) => sum + qty, 0),
    [cartItems]
  );

  useEffect(() => {
    if (itemIds.length === 0) {
      setCartItemsData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.allSettled(
      itemIds.map((id) =>
        getProduct(id).then((product) => ({
          ...product,
          quantity: cartItems[id],
        }))
      )
    )
      .then((results) => {
        const fulfilled = results
          .filter((r) => r.status === "fulfilled")
          .map((r) => r.value);
        setCartItemsData(fulfilled);
      })
      .catch(() => {
        setCartItemsData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemIds, cartItems]);

  const displayCartItemsData = useMemo(() => {
    return cartItemsData.map((item) => ({
      ...item,
      quantity: pendingQuantities[item.id] ?? item.quantity,
    }));
  }, [cartItemsData, pendingQuantities]);

  const subtotal = useMemo(() => {
    return cartItemsData.reduce(
      (sum, item) => sum + item.price * (cartItems[item.id] ?? 0),
      0
    );
  }, [cartItemsData, cartItems]);

  const addToCart = useCallback((productId, count = 1) => {
    setCartItems((prev) => {
      const current = prev[productId] || 0;
      const updated = { ...prev, [productId]: current + count };
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
    setPendingQuantities((prev) => {
      const newPending = { ...prev };
      delete newPending[productId];
      return newPending;
    });
  }, []);

  const updateQuantity = useCallback((productId, newQty) => {
    setPendingQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, newQty),
    }));
  }, []);

  const updateCart = useCallback(() => {
    setCartItems((prevCart) => {
      let hasChanges = false;
      const updatedCart = { ...prevCart };

      for (const [productId, newQty] of Object.entries(pendingQuantities)) {
        if (newQty <= 0) {
          if (productId in updatedCart) {
            delete updatedCart[productId];
            hasChanges = true;
          }
        } else if (updatedCart[productId] !== newQty) {
          updatedCart[productId] = newQty;
          hasChanges = true;
        }
      }

      if (hasChanges) {
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }

      return hasChanges ? updatedCart : prevCart;
    });

    setPendingQuantities({});
  }, [pendingQuantities]);

  const getItemSubtotal = useCallback((price, quantity) => {
    return price * Number(quantity);
  }, []);

  const resetPendingQuantities = useCallback(function () {
    setPendingQuantities({});
  }, []);

  const value = useMemo(
    () => ({
      cartItemsData: displayCartItemsData,
      loading,
      count,
      subtotal,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateCart,
      getItemSubtotal,
      resetPendingQuantities,
    }),
    [
      displayCartItemsData,
      loading,
      count,
      subtotal,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateCart,
      getItemSubtotal,
      resetPendingQuantities,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
