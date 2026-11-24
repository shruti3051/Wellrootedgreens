import React, { useEffect, useState, useContext } from "react";
import LogoImg from "../../assets/images/logo.png";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import CartDrawer from "../CartDrawer/CartDrawer";
import { ShoppingCart } from "lucide-react";
import "./Navbar.css";
function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navLinks = [
    { name: "SHOP", path: "/shop" },
    { name: "OUR STORY", path: "/our-story" },
    { name: "FROM SEED TO PLATE", path: "/seed-to-plate" },
    { name: "LEARN", path: "/learn" },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const { cartCount } = useContext(CartContext);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`navbar ${scroll ? "navbar-scrolled" : " "}`}>
        <div className="sub-nav">
          <h1 className="subtext">
            🌱 Free delivery in Pune on orders above ₹499{" "}
          </h1>
        </div>

        <div className="main-nav">
          <Link to="/" className="logo-image">
            <img src={LogoImg} alt="WELLROOTED" />
          </Link>

          <div className={`nav-option ${menuOpen ? " nav-open" : ""}`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <div className="nav-contact">
              {!loading && (
                <>
                  {user ? (
                    <div className="user-nav">
                      <button
                        type="button"
                        className="user-name"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                      >
                        Hi, {user.name} ▾
                      </button>

                      {userMenuOpen && (
                        <div className="user-dropdown">
                          <Link
                            to="/my-orders"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Orders
                          </Link>

                          <button
                            type="button"
                            onClick={() => {
                              logout();
                              setUserMenuOpen(false);
                            }}
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to="/login" className="nav-option">
                      Login
                    </Link>
                  )}
                </>
              )}

              <button
                type="button"
                className="cart-icon-btn"
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingCart color="white" className="cart-icon" />

                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </button>
            </div>

            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
          <div className="mobile-menu-header">
            <div className="mobile-user">
              {!loading && (
                <>
                  {user ? <span>Hi, {user.name}</span> : <span>Welcome</span>}
                </>
              )}
            </div>

            <button
              type="button"
              className="mobile-menu-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="mobile-menu-links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <Link to="/my-orders" onClick={() => setMenuOpen(false)}>
                ORDERS
              </Link>
            )}
          </div>

          <div className="mobile-menu-bottom">
            {user ? (
              <button
                type="button"
                className="mobile-logout"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                LOGOUT
              </button>
            ) : (
              <Link
                to="/login"
                className="mobile-login"
                onClick={() => setMenuOpen(false)}
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
export default Navbar;
