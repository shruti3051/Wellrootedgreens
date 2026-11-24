import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../context/AuthContext";

function AdminOrders() {
  const { token } = useContext(AuthContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusError, setStatusError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

    if (token) {
      fetchOrders();
    }
  }, [token]);

  const statusTransitions = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["preparing", "cancelled"],
    preparing: ["out-for-delivery", "cancelled"],
    "out-for-delivery": ["delivered"],
    delivered: [],
    cancelled: [],
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedOrder) return;

    try {
      setUpdatingStatus(true);
      setStatusError("");

      const response = await fetch(
        `http://localhost:5000/api/orders/${selectedOrder._id}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update order status");
      }

      console.log("UPDATED ORDER RESPONSE:", data);

      const updatedOrder = data.order || data;

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order,
        ),
      );

      setSelectedOrder(updatedOrder);
      setSuccessMessage(
        `Order status updated to ${newStatus.replaceAll("-", " ")}`,
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("STATUS UPDATE ERROR:", error);

      setStatusError(error.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <section className="admin-orders">
        <p>Loading orders...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="admin-orders">
        <p className="admin-orders-error">{error}</p>
      </section>
    );
  }

  return (
    <section className="admin-orders">
      {successMessage && (
        <div className="admin-success-toast">
          <span>✓</span>

          <p>{successMessage}</p>

          <button type="button" onClick={() => setSuccessMessage("")}>
            ×
          </button>
        </div>
      )}
      {selectedOrder && (
        <div
          className="admin-order-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="admin-order-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}

            <div className="admin-order-modal-header">
              <div>
                <span>ORDER DETAILS</span>

                <h2>#{selectedOrder._id.slice(-6).toUpperCase()}</h2>
              </div>

              <button
                type="button"
                className="admin-order-modal-close"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            {/* CUSTOMER INFO */}

            <div className="admin-order-info-grid">
              <div>
                <span>Customer</span>

                <strong>
                  {selectedOrder.user?.name ||
                    selectedOrder.deliveryAddress?.fullName ||
                    "Customer"}
                </strong>
              </div>

              <div>
                <span>Email</span>

                <strong>{selectedOrder.user?.email || "Not available"}</strong>
              </div>

              <div>
                <span>Phone</span>

                <strong>
                  {selectedOrder.deliveryAddress?.phone ||
                    selectedOrder.user?.phone ||
                    "Not available"}
                </strong>
              </div>

              <div>
                <span>Order Date</span>

                <strong>
                  {new Date(selectedOrder.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </strong>
              </div>
            </div>

            {/* STATUS */}

            <div className="admin-order-modal-section">
              <div className="admin-order-section-title">
                <h3>Order Status</h3>

                <span
                  className={`admin-order-status status-${selectedOrder.status}`}
                >
                  {selectedOrder.status
                    .replaceAll("-", " ")
                    .replace(/\b\w/g, (letter) => letter.toUpperCase())}
                </span>
              </div>

              <div className="admin-status-control">
                <label htmlFor="order-status">Update Status</label>

                {statusTransitions[selectedOrder.status]?.length > 0 ? (
                  <select
                    id="order-status"
                    value=""
                    onChange={(e) => {
                      if (e.target.value) {
                        handleStatusChange(e.target.value);
                      }
                    }}
                    disabled={updatingStatus}
                  >
                    <option value="">Choose next status</option>

                    {statusTransitions[selectedOrder.status].map((status) => (
                      <option key={status} value={status}>
                        {status
                          .replaceAll("-", " ")
                          .replace(/\b\w/g, (letter) => letter.toUpperCase())}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="admin-status-final">
                    {selectedOrder.status === "cancelled"
                      ? "This order has been cancelled."
                      : "This order has been completed."}
                  </p>
                )}

                {updatingStatus && (
                  <p className="admin-status-updating">
                    Updating order status...
                  </p>
                )}

                {statusError && (
                  <p className="admin-status-error">{statusError}</p>
                )}
              </div>
            </div>

            {/* ITEMS */}

            <div className="admin-order-modal-section">
              <h3>Items</h3>

              <div className="admin-order-modal-items">
                {selectedOrder.items?.map((item, index) => (
                  <div
                    className="admin-order-modal-item"
                    key={item._id || index}
                  >
                    <div>
                      <strong>{item.name}</strong>

                      <span>
                        {item.weight} × {item.quantity}
                      </span>
                    </div>

                    <div className="admin-order-item-price">
                      <span>
                        ₹{item.price} × {item.quantity}
                      </span>

                      <strong>₹{item.price * item.quantity}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DELIVERY ADDRESS */}

            <div className="admin-order-modal-section">
              <h3>Delivery Address</h3>

              <div className="admin-delivery-address">
                <strong>{selectedOrder.deliveryAddress?.fullName}</strong>

                <p>{selectedOrder.deliveryAddress?.addressLine}</p>

                <p>
                  {selectedOrder.deliveryAddress?.city}

                  {selectedOrder.deliveryAddress?.pincode
                    ? ` - ${selectedOrder.deliveryAddress.pincode}`
                    : ""}
                </p>

                <p>
                  Phone:{" "}
                  {selectedOrder.deliveryAddress?.phone || "Not available"}
                </p>
              </div>
            </div>

            {/* TOTAL */}

            <div className="admin-order-modal-total">
              <span>Order Total</span>

              <strong>₹{selectedOrder.totalAmount}</strong>
            </div>
          </div>
        </div>
      )}
      <div className="admin-orders-header">
        <div>
          <p className="admin-orders-eyebrow">ORDERS</p>

          <h1>Order Management</h1>

          <p className="admin-orders-description">
            View and manage customer orders, fulfillment and delivery status.
          </p>
        </div>
      </div>

      <div className="admin-orders-summary">
        <p>
          <strong>{orders.length}</strong>{" "}
          {orders.length === 1 ? "order" : "orders"}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="admin-orders-empty">
          <p>No orders yet.</p>
        </div>
      ) : (
        <div className="admin-orders-table-wrapper">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <span className="admin-order-id">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                  </td>

                  <td>
                    <div className="admin-order-customer">
                      <strong>
                        {order.user?.name ||
                          order.deliveryAddress?.fullName ||
                          "Customer"}
                      </strong>

                      <span>{order.user?.email || "No email"}</span>
                    </div>
                  </td>

                  <td>
                    <span className="admin-order-items">
                      {order.items?.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      ) || 0}{" "}
                      items
                    </span>
                  </td>

                  <td>
                    <strong className="admin-order-total">
                      ₹{order.totalAmount}
                    </strong>
                  </td>

                  <td>
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td>
                    <span
                      className={`admin-order-status status-${order.status}`}
                    >
                      {order.status
                        .replaceAll("-", " ")
                        .replace(/\b\w/g, (letter) => letter.toUpperCase())}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="admin-view-order-btn"
                      onClick={() => {
                        setStatusError("");
                        setSelectedOrder(order);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminOrders;
