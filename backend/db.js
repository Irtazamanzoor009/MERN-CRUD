const mongoose = require("mongoose");

const url = `mongodb+srv://irtazamanzoor1203:ecommerce1203@ecommerce-cluster.3xyux.mongodb.net/CRUD?retryWrites=true&w=majority&appName=Ecommerce-cluster`;

const connection_db = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connection_db;
