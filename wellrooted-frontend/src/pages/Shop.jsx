import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
function Shop() {
  const { cart, addToCart, removeFromCart, updateQuantity } =
    useContext(CartContext);

  const navigate = useNavigate();

  const [addingToCart, setAddingToCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = async (product) => {
    if (!product) {
      return;
    }
    if (product.stock <= 0) {
      return;
    }

    try {
      setAddingToCart(true);

      await addToCart(product._id, 1);
    } catch (error) {
      if (error.message === "Please login to add products to cart") {
        navigate("/login");
        return;
      }

      console.error(error.message);
    } finally {
      setAddingToCart(false);
    }
  };

  const getCartItem = (productId) => {
    return cart?.items?.find((item) => item.product._id === productId);
  };

  const cartItem = selectedProduct ? getCartItem(selectedProduct._id) : null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="shop-page">
      <p className="shop-label">FRESHLY GROWN</p>

      <h1>
        Find Your <span>Greens.</span>
      </h1>

      <p className="shop-intro">
        Explore our complete collection of freshly grown microgreens.
      </p>

      {/* PRODUCT GRID */}

      <div className="shop-grid">
        {products.map((product) => {
          const productCartItem = getCartItem(product._id);

          return (
            <div
              className="shop-card"
              key={product._id}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="shop-card-image">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div className="shop-image-placeholder">🌱</div>
                )}
              </div>

              <div className="shop-card-content">
                <h2>{product.name}</h2>

                <p>{product.shortDescription}</p>
                {/* STOCK MESSAGE */}

                {product.stock > 0 && product.stock <= 5 && (
                  <p className="low-stock">Only {product.stock} left</p>
                )}

                {product.stock === 0 && (
                  <p className="stock-unavailable">Currently unavailable</p>
                )}
                <div className="shop-card-bottom">
                  <span>
                    ₹{product.price} / {product.weight}
                  </span>

                  {product.stock === 0 ? (
                    <button
                      type="button"
                      className="out-of-stock-btn"
                      disabled
                      onClick={(e) => e.stopPropagation()}
                    >
                      Out of Stock
                    </button>
                  ) : productCartItem ? (
                    <div
                      className="quantity-control card-quantity-control"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (productCartItem.quantity === 1) {
                            removeFromCart(product._id);
                          } else {
                            updateQuantity(
                              product._id,
                              productCartItem.quantity - 1,
                            );
                          }
                        }}
                      >
                        −
                      </button>

                      <span>{productCartItem.quantity}</span>

                      <button
                        type="button"
                        disabled={productCartItem.quantity >= product.stock}
                        onClick={() =>
                          updateQuantity(
                            product._id,
                            productCartItem.quantity + 1,
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="card-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
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

      {/* PRODUCT DETAIL MODAL */}

      {selectedProduct && (
        <div
          className="product-modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            {/* CLOSE */}

            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            {/* LARGE PRODUCT IMAGE */}
            <div className="modal-image">
              {selectedProduct.image ? (
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              ) : (
                <div className="modal-image-placeholder">🌱</div>
              )}
            </div>

            {/* PRODUCT DETAILS */}

            <div className="modal-content">
              <p className="modal-label">FRESHLY GROWN</p>

              <h2>{selectedProduct.name}</h2>

              <p className="modal-short-description">
                {selectedProduct.shortDescription}
              </p>

              <p className="modal-description">{selectedProduct.description}</p>

              {/* MODAL STOCK MESSAGE */}

              {selectedProduct.stock > 0 && selectedProduct.stock <= 5 && (
                <p className="low-stock">Only {selectedProduct.stock} left</p>
              )}

              {selectedProduct.stock === 0 && (
                <p className="stock-unavailable">Currently unavailable</p>
              )}

              <div className="modal-footer">
                <div className="modal-price">
                  <strong>₹{selectedProduct.price}</strong>

                  <span>/ {selectedProduct.weight}</span>
                </div>

                {/* ==========================
                    OUT OF STOCK
                ========================== */}

                {selectedProduct.stock === 0 ? (
                  <button type="button" className="out-of-stock-btn" disabled>
                    Out of Stock
                  </button>
                ) : cartItem ? (
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => {
                        if (cartItem.quantity === 1) {
                          removeFromCart(selectedProduct._id);
                        } else {
                          updateQuantity(
                            selectedProduct._id,
                            cartItem.quantity - 1,
                          );
                        }
                      }}
                    >
                      −
                    </button>

                    <span>{cartItem.quantity}</span>

                    <button
                      type="button"
                      disabled={cartItem.quantity >= selectedProduct.stock}
                      onClick={() =>
                        updateQuantity(
                          selectedProduct._id,
                          cartItem.quantity + 1,
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="modal-cart-btn"
                    type="button"
                    onClick={() => handleAddToCart(selectedProduct)}
                    disabled={addingToCart}
                  >
                    {addingToCart ? "Adding..." : "Add to Cart"}
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Shop;
