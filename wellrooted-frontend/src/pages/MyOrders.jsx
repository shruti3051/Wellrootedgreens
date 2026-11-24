import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function MyOrders() {
  const { user, token, loading: authLoading } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (authLoading) {
        return;
      }

      if (!user || !token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, token, authLoading]);

  if (authLoading || loading) {
    return (
      <main className="my-orders-page">
        <p>Loading your orders...</p>
      </main>
    );
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="my-orders-page">
      <div className="my-orders-header">
        <p>YOUR HARVEST</p>

        <h1>
          My <span>Orders.</span>
        </h1>
      </div>

      {error && <p className="orders-error">{error}</p>}

      {!error && orders.length === 0 && (
        <div className="no-orders">
          <h2>No orders yet.</h2>
          <p>Your future harvests will appear here.</p>
        </div>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <article className="order-card" key={order._id}>
            <div className="order-card-header">
              <div>
                <span>ORDER</span>

                <h3>#{order._id.slice(-8).toUpperCase()}</h3>
              </div>

              <span className="order-status">{order.status}</span>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div className="order-item" key={item.product}>
                  <div>
                    <strong>{item.name}</strong>

                    <p>
                      {item.weight} × {item.quantity}
                    </p>
                  </div>

                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-card-footer">
              <div>
                <span>Placed on</span>

                <strong>
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Total</span>

                <strong>₹{order.totalAmount}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default MyOrders;
