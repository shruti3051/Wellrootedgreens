import React, { useContext, useEffect, useState } from "react";
import "./Product.css";
import { Link, useNavigate } from "react-router-dom";

import CartContext from "../../context/CartContext";

function Product() {
  const [products, setProducts] = useState([]);

  const { cart, addToCart, updateQuantity, removeFromCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    // Frontend stock protection
    if (!product || product.stock <= 0) {
      return;
    }

    try {
      await addToCart(product._id, 1);
    } catch (error) {
      if (error.message === "Please login to add products to cart") {
        navigate("/login");
        return;
      }

      console.error(error.message);
    }
  };

  const getCartItem = (productId) => {
    return cart?.items?.find((cartItem) => cartItem.product._id === productId);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <section className="products-section" id="shop">
      <p>Our greens</p>

      <div className="products-heading">
        <div className="sub-heading">
          <h2>
            Choose Your <span>Greens.</span>
          </h2>
        </div>

        <Link to="/shop" className="sub-heading-sec">
          <h2>VIEW ALL PRODUCTS</h2>

          <button type="button">
            <span>→</span>
          </button>
        </Link>
      </div>

      <div className="products-grid">
        {products.slice(0, 6).map((item) => {
          const cartItem = getCartItem(item._id);

          return (
            <div key={item._id} className="product-card">
              <div className="product-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className="product-image-placeholder">🌱</div>
                )}
              </div>

              <div className="product-info">
                <h1>{item.name}</h1>

                <p className="product-description">{item.description}</p>

                {/* LOW STOCK */}
                {item.stock > 0 && item.stock <= 5 && (
                  <p className="low-stock">Only {item.stock} left</p>
                )}

                {/* OUT OF STOCK */}
                {item.stock === 0 && (
                  <p className="stock-unavailable">Currently unavailable</p>
                )}

                <div className="product-bottom">
                  <div className="product-price">
                    <strong>₹{item.price}</strong>

                    <span>/{item.weight}</span>
                  </div>

                  {/* STOCK = 0 */}
                  {item.stock === 0 ? (
                    <button type="button" className="out-of-stock-btn" disabled>
                      Out of Stock
                    </button>
                  ) : cartItem ? (
                    /* ALREADY IN CART */

                    <div className="home-quantity-control">
                      <button
                        type="button"
                        onClick={() => {
                          if (cartItem.quantity === 1) {
                            removeFromCart(item._id);
                          } else {
                            updateQuantity(item._id, cartItem.quantity - 1);
                          }
                        }}
                      >
                        −
                      </button>

                      <span>{cartItem.quantity}</span>

                      <button
                        type="button"
                        disabled={cartItem.quantity >= item.stock}
                        onClick={() =>
                          updateQuantity(item._id, cartItem.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    /* NOT IN CART */

                    <button
                      type="button"
                      className="add-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Product;
