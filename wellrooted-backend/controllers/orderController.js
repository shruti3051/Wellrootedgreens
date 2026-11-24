const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const createOrder = async (req, res, next) => {
  try {
    const { fullName, phone, addressLine, city, pincode } = req.body;

    if (!fullName || !phone || !addressLine || !city || !pincode) {
      return res.status(400).json({
        message: "All delivery details are required",
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    for (const item of cart.items) {
      const product = item.product;

      if (!product) {
        return res.status(400).json({
          message: "One or more products are no longer available",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Only ${product.stock} ${product.name} available in stock`,
        });
      }
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      weight: item.product.weight,
      quantity: item.quantity,
    }));

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const order = await Order.create({
      user: req.user._id,

      items: orderItems,

      totalAmount,

      deliveryAddress: {
        fullName,
        phone,
        addressLine,
        city,
        pincode,
      },
    });

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: {
          stock: -item.quantity,
        },
      });
    }

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "preparing",
      "out-for-delivery",
      "delivered",
      "cancelled",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const currentStatus = order.status;

    if (currentStatus === status) {
      return res.status(400).json({
        message: `Order is already ${status}`,
      });
    }

    const validTransitions = {
      pending: ["confirmed", "cancelled"],

      confirmed: ["preparing", "cancelled"],

      preparing: ["out-for-delivery", "cancelled"],

      "out-for-delivery": ["delivered"],

      delivered: [],

      cancelled: [],
    };

    if (!validTransitions[currentStatus]?.includes(status)) {
      return res.status(400).json({
        message: `Cannot change order status from ${currentStatus} to ${status}`,
      });
    }

    if (status === "cancelled") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: {
            stock: item.quantity,
          },
        });
      }
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
