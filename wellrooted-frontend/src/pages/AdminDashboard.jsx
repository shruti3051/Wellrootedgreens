import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

function AdminDashboard() {
  const { user, token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [productsResponse, ordersResponse] = await Promise.all([
          fetch("http://localhost:5000/api/products"),

          fetch("http://localhost:5000/api/orders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const productsData = await productsResponse.json();
        const ordersData = await ordersResponse.json();

        if (!productsResponse.ok) {
          throw new Error(productsData.message || "Failed to fetch products");
        }

        if (!ordersResponse.ok) {
          throw new Error(ordersData.message || "Failed to fetch orders");
        }

        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const totalProducts = products.length;

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((total, order) => {
      return total + order.totalAmount;
    }, 0);

  const recentOrders = orders.slice(0, 5);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard-header">
        <p className="admin-eyebrow">ADMIN OVERVIEW</p>

        <h1>Welcome back, {user?.name}.</h1>

        <p>Here's what's happening at WellRooted today.</p>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <span>Total Products</span>
          <strong>{totalProducts}</strong>
        </div>

        <div className="dashboard-stat-card">
          <span>Total Orders</span>
          <strong>{totalOrders}</strong>
        </div>

        <div className="dashboard-stat-card">
          <span>Pending Orders</span>
          <strong>{pendingOrders}</strong>
        </div>

        <div className="dashboard-stat-card">
          <span>Revenue</span>
          <strong>₹{totalRevenue}</strong>
        </div>
      </div>

      <div className="dashboard-recent">
        <div className="dashboard-section-heading">
          <div>
            <span>ORDERS</span>
            <h2>Recent Orders</h2>
          </div>
        </div>

        {recentOrders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="dashboard-table-wrapper">
            <table className="dashboard-orders-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>#{order._id.slice(-8).toUpperCase()}</td>

                    <td>
                      {order.user?.name ||
                        order.deliveryAddress?.fullName ||
                        "Customer"}
                    </td>

                    <td>
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    <td>₹{order.totalAmount}</td>

                    <td>
                      <span className={`dashboard-status ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;
