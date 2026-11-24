import React, { useContext } from "react";
import CartContext from "../../context/CartContext";
import "./CartDrawer.css";
import { useNavigate } from "react-router-dom";

function CartDrawer({ isOpen, onClose }) {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  const subtotal =
    cart?.items?.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0) || 0;

  const navigate = useNavigate();

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}

      <aside className={`cart-drawer ${isOpen ? "cart-drawer-open" : ""}`}>
        <div className="cart-drawer-header">
          <div>
            <p>YOUR HARVEST</p>
            <h2>Your Cart</h2>
          </div>

          <button type="button" className="cart-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cart-drawer-body">
          {!cart?.items?.length ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>

              <span>Add some fresh greens to get started.</span>
            </div>
          ) : (
            cart.items.map((item) => (
              <div className="cart-drawer-item" key={item.product._id}>
                <div className="cart-item-image">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    loading="lazy"
                  />
                </div>

                <div className="cart-item-info">
                  <div className="cart-item-top">
                    <div>
                      <h3>{item.product.name}</h3>

                      <p>{item.product.weight}</p>

                      {item.product.stock > 0 && item.product.stock <= 5 && (
                        <span className="cart-low-stock">
                          Only {item.product.stock} left
                        </span>
                      )}

                      {item.quantity > item.product.stock && (
                        <span className="cart-stock-warning">
                          Stock changed. Only {item.product.stock} available.
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => removeFromCart(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="cart-item-bottom">
                    <div className="cart-quantity">
                      <button
                        type="button"
                        onClick={() => {
                          if (item.quantity === 1) {
                            removeFromCart(item.product._id);
                          } else {
                            updateQuantity(item.product._id, item.quantity - 1);
                          }
                        }}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        disabled={item.quantity >= item.product.stock}
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <strong>₹{item.product.price * item.quantity}</strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart?.items?.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>

              <strong>₹{subtotal}</strong>
            </div>

            <p className="cart-delivery-note">
              Delivery charges, if applicable, are calculated at checkout.
            </p>

            <button
              type="button"
              className="checkout-btn"
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
            >
              Proceed to Checkout
              <span>→</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
