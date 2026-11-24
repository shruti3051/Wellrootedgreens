import { createContext, useContext, useEffect, useState } from "react";

import AuthContext from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token, loading: authLoading } = useContext(AuthContext);

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      if (authLoading) {
        return;
      }

      if (!user || !token) {
        setCart(null);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch cart");
        }

        setCart(data);
      } catch (error) {
        console.error("Cart error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, token, authLoading]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user || !token) {
      throw new Error("Please login to add products to cart");
    }

    const response = await fetch("http://localhost:5000/api/cart", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        productId,
        quantity,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add product to cart");
    }

    setCart(data.cart);

    return data.cart;
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user || !token) {
      throw new Error("Please login");
    }

    const response = await fetch(
      `http://localhost:5000/api/cart/${productId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          quantity,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update cart");
    }

    setCart(data.cart);

    return data.cart;
  };

  const removeFromCart = async (productId) => {
    if (!user || !token) {
      throw new Error("Please login");
    }

    const response = await fetch(
      `http://localhost:5000/api/cart/${productId}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to remove product");
    }

    setCart(data.cart);

    return data.cart;
  };

  const cartCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const clearCart = () => {
    setCart({
      ...cart,
      items: [],
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
