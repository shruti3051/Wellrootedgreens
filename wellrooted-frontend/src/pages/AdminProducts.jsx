import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../context/AuthContext";
function AdminProducts() {
  const { token } = useContext(AuthContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    weight: "100g",
    stock: "",
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setFormError("");

      if (!imageFile) {
        throw new Error("Please select a product image");
      }

      const imageFormData = new FormData();

      imageFormData.append("image", imageFile);

      const imageResponse = await fetch(
        "http://localhost:5000/api/upload/product-image",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: imageFormData,
        },
      );

      const imageData = await imageResponse.json();

      if (!imageResponse.ok) {
        throw new Error(imageData.message || "Failed to upload product image");
      }

      const imageUrl = imageData.imageUrl;

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          name: formData.name.trim(),
          shortDescription: formData.shortDescription.trim(),
          description: formData.description.trim(),
          price: Number(formData.price),
          weight: formData.weight.trim(),
          stock: Number(formData.stock),
          image: imageUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      setProducts((previousProducts) => [data, ...previousProducts]);

      setSuccessMessage("Product added successfully");

      setFormData({
        name: "",
        shortDescription: "",
        description: "",
        price: "",
        weight: "100g",
        stock: "",
      });

      setImageFile(null);
      setImagePreview("");

      setShowAddModal(false);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("ADD PRODUCT ERROR:", error);

      setFormError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      price: product.price ?? "",
      weight: product.weight || "100g",
      stock: product.stock ?? "",
    });
    setImageFile(null);
    setImagePreview(product.image || "");
    setFormError("");
    setShowAddModal(true);
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);

    setFormData({
      name: "",
      shortDescription: "",
      description: "",
      price: "",
      weight: "100g",
      stock: "",
    });

    setImageFile(null);
    setImagePreview("");

    setFormError("");
    setShowAddModal(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (!editingProduct) return;

    try {
      setSubmitting(true);
      setFormError("");

      // Start with the existing image
      let imageUrl = editingProduct.image || "";

      // If admin selected a NEW image,
      // upload that image to Cloudinary first
      if (imageFile) {
        const imageFormData = new FormData();

        imageFormData.append("image", imageFile);

        const imageResponse = await fetch(
          "http://localhost:5000/api/upload/product-image",
          {
            method: "POST",

            headers: {
              Authorization: `Bearer ${token}`,
            },

            body: imageFormData,
          },
        );

        const imageData = await imageResponse.json();

        if (!imageResponse.ok) {
          throw new Error(
            imageData.message || "Failed to upload product image",
          );
        }

        imageUrl = imageData.imageUrl;
      }

      // Update the actual product
      const response = await fetch(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: formData.name.trim(),
            shortDescription: formData.shortDescription.trim(),
            description: formData.description.trim(),
            price: Number(formData.price),
            weight: formData.weight.trim(),
            stock: Number(formData.stock),
            image: imageUrl,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update product");
      }

      setProducts((previousProducts) =>
        previousProducts.map((product) =>
          product._id === editingProduct._id ? data : product,
        ),
      );

      setSuccessMessage("Product updated successfully");

      setShowAddModal(false);
      setEditingProduct(null);

      setImageFile(null);
      setImagePreview("");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("UPDATE PRODUCT ERROR:", error);

      setFormError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    if (submitting) return;

    setShowAddModal(false);
    setEditingProduct(null);
    setFormError("");

    setImageFile(null);
    setImagePreview("");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:5000/api/products");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `http://localhost:5000/api/products/${productToDelete._id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product._id !== productToDelete._id,
        ),
      );

      setProductToDelete(null);

      setSuccessMessage("Product deleted successfully");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setFormError(error.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <section className="admin-products">
      {successMessage && (
        <div className="admin-success-toast">
          <span>✓</span>

          <p>{successMessage}</p>

          <button type="button" onClick={() => setSuccessMessage("")}>
            ×
          </button>
        </div>
      )}

      {productToDelete && (
        <div
          className="admin-modal-overlay"
          onClick={() => {
            if (!deleting) {
              setProductToDelete(null);
            }
          }}
        >
          <div
            className="admin-delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-delete-icon">!</div>

            <h2>Delete Product?</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>{productToDelete.name}</strong>?
            </p>

            <p className="admin-delete-warning">
              This product will be permanently removed from your catalog.
            </p>

            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-cancel-btn"
                onClick={() => setProductToDelete(null)}
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-delete-confirm-btn"
                onClick={handleDeleteProduct}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-products-header">
        <div>
          <p className="admin-products-eyebrow">CATALOG</p>

          <h1>Products</h1>

          <p className="admin-products-description">
            Manage your WellRooted product catalog, pricing and inventory.
          </p>
        </div>

        <button
          type="button"
          className="admin-add-product"
          onClick={handleOpenAddModal}
        >
          + Add Product
        </button>
      </div>

      <div className="admin-products-panel">
        {showAddModal && (
          <div className="admin-modal-overlay" onClick={handleCloseModal}>
            <div
              className="admin-product-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-modal-header">
                <div>
                  <span>CATALOG</span>
                  <h2>
                    {editingProduct ? "Edit Product" : "Add Product"}
                  </h2>{" "}
                </div>

                <button
                  type="button"
                  className="admin-modal-close"
                  onClick={handleCloseModal}
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={
                  editingProduct ? handleUpdateProduct : handleAddProduct
                }
              >
                <div className="admin-form-group">
                  <label>Product Name</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Broccoli"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Short Description</label>

                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Fresh, mild and nutrient-rich."
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Description</label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Full product description..."
                    rows="4"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label>Product Image</label>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                  />

                  {imagePreview && (
                    <div className="admin-image-preview">
                      <img src={imagePreview} alt="Product preview" />
                    </div>
                  )}
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Price (₹)</label>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Weight</label>

                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="100g"
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Stock (number of packs)</label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    required
                  />
                </div>

                {formError && <p className="admin-form-error">{formError}</p>}

                <div className="admin-form-actions">
                  <button
                    type="button"
                    className="admin-cancel-btn"
                    onClick={handleCloseModal}
                    disabled={submitting}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="admin-save-btn"
                    disabled={submitting}
                  >
                    {submitting
                      ? editingProduct
                        ? "Updating..."
                        : "Adding..."
                      : editingProduct
                        ? "Update Product"
                        : "Add Product"}{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="admin-products-summary">
          <p>
            <strong>{products.length}</strong> products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="admin-products-empty">
            <p>No products found.</p>
          </div>
        ) : (
          <div className="admin-products-table-wrapper">
            <table className="admin-products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Weight</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Inventory</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div className="admin-product-name">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="admin-product-thumbnail"
                          />
                        ) : (
                          <div className="admin-product-placeholder">🌱</div>
                        )}

                        <div>
                          <strong>{product.name}</strong>

                          <span>{product.shortDescription}</span>
                        </div>
                      </div>
                    </td>

                    <td>{product.weight}</td>

                    <td>₹{product.price}</td>

                    <td>{product.stock}</td>

                    <td>
                      <span
                        className={`inventory-status ${
                          product.stock === 0
                            ? "out"
                            : product.stock <= 5
                              ? "low"
                              : "available"
                        }`}
                      >
                        {product.stock === 0
                          ? "Out of stock"
                          : product.stock <= 5
                            ? "Low stock"
                            : "In stock"}
                      </span>
                    </td>

                    <td>
                      <div className="admin-product-actions">
                        <button
                          type="button"
                          onClick={() => handleEditClick(product)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete"
                          onClick={() => setProductToDelete(product)}
                        >
                          Delete
                        </button>
                      </div>
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

export default AdminProducts;
