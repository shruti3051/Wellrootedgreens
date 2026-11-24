import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import "./AdminLayout.css";

function AdminLayout() {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}

      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>ADMIN PANEL</span>
        </div>

        <nav className="admin-navigation">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            Orders
          </NavLink>
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-user">
            <span>Signed in as</span>
            <strong>{user?.name}</strong>
          </div>

          <button type="button" onClick={() => navigate("/")}>
            View Store
          </button>

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* PAGE CONTENT */}

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
