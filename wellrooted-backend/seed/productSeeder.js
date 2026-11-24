const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

const Product = require("../models/Product");

dotenv.config({
  path: path.join(__dirname, "../.env"),
});
const products = [
  {
    name: "Broccoli",
    shortDescription: "Fresh, mild and nutrient-rich.",
    description:
      "Tender broccoli microgreens with a mild, fresh flavour and delicate crunch. Great for salads, sandwiches, wraps, bowls and garnishing everyday meals.",
    price: 120,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Sunflower",
    shortDescription: "Crunchy, nutty and naturally fresh.",
    description:
      "Crisp sunflower microgreens with a pleasant nutty flavour and satisfying texture. A delicious addition to salads, sandwiches, wraps and wholesome bowls.",
    price: 150,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Pea Shoots",
    shortDescription: "Tender, sweet and crisp.",
    description:
      "Fresh pea shoots with a naturally sweet flavour and tender crunch. Perfect for salads, stir-fries, sandwiches, pasta dishes and beautiful plate garnishes.",
    price: 130,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Pink Radish",
    shortDescription: "Fresh greens with a peppery kick.",
    description:
      "Bright pink radish microgreens with a crisp texture and distinctive peppery flavour. Excellent for adding colour and a fresh kick to salads, sandwiches and plated dishes.",
    price: 120,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Purple Radish",
    shortDescription: "Colourful, crisp and mildly spicy.",
    description:
      "Vibrant purple radish microgreens with crisp stems and a pleasantly spicy flavour. Ideal for salads, wraps, bowls and restaurant-style garnishing.",
    price: 130,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Fenugreek",
    shortDescription: "Aromatic greens with distinctive flavour.",
    description:
      "Fresh fenugreek microgreens with a distinctive aromatic flavour and tender texture. They pair well with salads, sandwiches, Indian dishes and creative everyday meals.",
    price: 100,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Kale",
    shortDescription: "Tender greens with a fresh earthy taste.",
    description:
      "Young kale microgreens with tender leaves and a mild earthy flavour. Easy to use in salads, smoothies, wraps, sandwiches and colourful meal bowls.",
    price: 140,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Mustard",
    shortDescription: "Bold greens with a spicy flavour.",
    description:
      "Mustard microgreens bring a bold, slightly spicy flavour and delicate crunch. They work especially well in sandwiches, salads, wraps and savoury dishes.",
    price: 110,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Spinach",
    shortDescription: "Soft, fresh and pleasantly mild.",
    description:
      "Tender spinach microgreens with a mild leafy flavour. A versatile choice for salads, sandwiches, smoothies, wraps and a variety of everyday dishes.",
    price: 120,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Red Amaranth",
    shortDescription: "Vibrant colour with a delicate earthy taste.",
    description:
      "Striking red amaranth microgreens with vibrant colour, delicate leaves and a mild earthy flavour. Especially attractive as a garnish for salads, bowls and premium plated dishes.",
    price: 130,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Beetroot",
    shortDescription: "Colourful, tender and mildly earthy.",
    description:
      "Beetroot microgreens feature colourful stems, tender leaves and a subtle earthy flavour. They add visual contrast and freshness to salads, sandwiches and plated meals.",
    price: 140,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Wheatgrass",
    shortDescription: "Fresh young shoots with a grassy flavour.",
    description:
      "Fresh young wheatgrass shoots with their characteristic clean and grassy flavour. Commonly used for fresh preparations, juices and wellness-focused recipes.",
    price: 100,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Coriander",
    shortDescription: "Fragrant greens with classic coriander flavour.",
    description:
      "Young coriander microgreens with a fresh aroma and familiar coriander flavour. Excellent for Indian dishes, salads, soups, tacos and restaurant-style garnishing.",
    price: 150,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Basil",
    shortDescription: "Fresh, aromatic and flavourful.",
    description:
      "Aromatic basil microgreens with tender leaves and a distinctive fresh basil flavour. Ideal for pasta, pizza, salads, sandwiches and Mediterranean-inspired dishes.",
    price: 160,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Chia",
    shortDescription: "Tender greens with a mild fresh taste.",
    description:
      "Young chia microgreens with delicate leaves and a mild fresh flavour. They can be used in salads, sandwiches, bowls and as a simple finishing garnish.",
    price: 130,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Cabbage",
    shortDescription: "Crisp young greens with a mild flavour.",
    description:
      "Cabbage microgreens offer tender leaves, crisp stems and a mild cabbage-like flavour. A versatile option for salads, wraps, sandwiches and colourful garnishes.",
    price: 120,
    weight: "100g",
    image: "",
    stock: 10,
  },

  {
    name: "Pak Choi",
    shortDescription: "Tender, crisp and delicately fresh.",
    description:
      "Young pak choi microgreens with tender leaves, crisp stems and a mild fresh flavour. They work beautifully in salads, Asian-inspired dishes, bowls and garnishes.",
    price: 140,
    weight: "100g",
    image: "",
    stock: 10,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Development only:
    // remove existing products before inserting fresh seed data
    await Product.deleteMany({});

    const createdProducts = await Product.insertMany(products);

    console.log(`${createdProducts.length} products seeded successfully`);

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedProducts();
