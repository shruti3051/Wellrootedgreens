import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="order-success-page">
      <div className="order-success-card">
        <div className="success-icon">✓</div>

        <p className="success-label">ORDER CONFIRMED</p>

        <h1>
          Thank You for
          <span> Your Order.</span>
        </h1>

        <p className="success-message">
          Your fresh greens are one step closer to your plate.
        </p>

        <div className="success-order-info">
          <div>
            <span>Order ID</span>
            <strong>#{order._id.slice(-8).toUpperCase()}</strong>
          </div>

          <div>
            <span>Total</span>
            <strong>₹{order.totalAmount}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{order.status}</strong>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/shop" className="continue-shopping-btn">
            Continue Shopping
          </Link>

          <Link to="/my-orders" className="view-orders-btn">
            View My Orders
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;
