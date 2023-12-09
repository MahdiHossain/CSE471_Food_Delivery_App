const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authController = require("./controllers/authController");
const companyController = require("./controllers/companyController");
const uploadController = require("./controllers/uploadController");
const productController = require("./controllers/productController");
const commentController = require("./controllers/commentController");
const userController = require("./controllers/userController");
const app = express();

mongoose.set('strictQuery', false) // This line of code turns off strict query mode for mongoose. This will allow mongoose to use non-standard query syntax.
const dbConnection = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log('MongoDB has started successfully');
    } catch (error) {
      console.error(error);
    }
  };
  dbConnection();



app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/images', express.static('public/images'))
app.use("/auth", authController)
app.use("/company", companyController)
app.use("/upload", uploadController)
app.use('/product', productController)
app.use('/user', userController)
app.use('/comment', commentController)
app.listen(process.env.PORT, () => console.log("Server started successfully!"));