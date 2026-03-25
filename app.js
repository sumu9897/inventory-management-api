const express = require("express");
const itemRoutes = require("./routes/itemRoutes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandeler");
const cors = require("cors");


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Inventory Management API!"
  });
});

// Routes
app.use("/api/items", itemRoutes);

// Not found middleware
app.use(notFound);

// Error handler middleware
app.use(errorHandler);

module.exports = app;