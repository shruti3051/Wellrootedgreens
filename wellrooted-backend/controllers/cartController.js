const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product id is required",
      });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        messgae: "Quantity must be a positive integer",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    if (product.stock === 0) {
      return res.status(400).json({
        message: "Product is out of stock",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      if (quantity > product.stock) {
        return res.status(400).json({
          message: `Only ${product.stock} items available in stock`,
        });
      }

      cart = await Cart.create({
        user: req.user._id,
        items: [
          {
            product: productId,
            quantity,
          },
        ],
      });
    } else {
      const excistingItem = cart.items.find(
        (item) => item.product.toString() === productId,
      );
      if (excistingItem) {
        const newQuantity = excistingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          return res.status(400).json({
            message: `Only ${product.stock} items available in stock`,
          });
        }
        excistingItem.quantity = newQuantity;
      } else {
        if (quantity > product.stock) {
          return res.status(400).json({
            message: `Only ${product.stock} items available in stock`,
          });
        }

        cart.items.push({
          product: productId,
          quantity,
        });
      }

      await cart.save();
    }

    await cart.populate("items.product");
    res.status(200).json({
      message: "product added to cart",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        user: req.user._id,
        items: [],
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        message: "quantity must be a positive integer",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.stock === 0) {
      return res.status(400).json({
        message: "Product is out of stock",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} items available in stock`,
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.product");
    res.status(200).json({
      message: "Cart updated",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const itemExists = cart.items.some(
      (item) => item.product.toString() === productId,
    );

    if (!itemExists) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
};
