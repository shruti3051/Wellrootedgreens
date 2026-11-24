const moongose = require("mongoose");

const connectDb = async () => {
  try {
    await moongose.connect(process.env.MONGO_URI);
    console.log("connected Mongo");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
