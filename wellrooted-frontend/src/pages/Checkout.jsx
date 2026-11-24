import React, { useContext, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";

function Checkout() {
  const { user, token, loading: authLoading } = useContext(AuthContext);

  const { cart, clearCart, loading: cartLoading } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "Pune",
    pincode: "",
  });

  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const subtotal =
    cart?.items?.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0) || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setPlacingOrder(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      setOrderPlaced(true);

      clearCart();

      navigate("/order-success", {
        state: {
          order: data.order,
        },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  if (authLoading || cartLoading) {
    return (
      <main className="checkout-page">
        <p>Loading...</p>
      </main>
    );
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (!orderPlaced && !cart?.items?.length) {
    return <Navigate to="/shop" replace />;
  }
  return (
    <main className="checkout-page">
      <div className="checkout-header">
        <p>ALMOST THERE</p>

        <h1>
          Complete Your <span>Order.</span>
        </h1>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Delivery Details</h2>

          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Address
            <textarea
              name="addressLine"
              value={formData.addressLine}
              onChange={handleChange}
              required
            />
          </label>

          <div className="checkout-form-row">
            <label>
              City
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Pincode
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {error && <p className="checkout-error">{error}</p>}

          <button
            type="submit"
            className="place-order-btn"
            disabled={placingOrder}
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart?.items?.map((item) => (
            <div className="checkout-item" key={item.product._id}>
              <div>
                <h3>{item.product.name}</h3>

                <p>
                  {item.quantity} × ₹{item.product.price}
                </p>
              </div>

              <strong>₹{item.product.price * item.quantity}</strong>
            </div>
          ))}

          <div className="checkout-total">
            <span>Subtotal</span>

            <strong>₹{subtotal}</strong>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
