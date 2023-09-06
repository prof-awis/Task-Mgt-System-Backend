const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectToDB = require("./config/db");
// import our database connection
const { handleError } = require("./middlewares/errorHandlers");
const { verifyToken } = require("./middlewares/verifyToken");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
connectToDB();
// Add middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", verifyToken, taskRoutes);
app.use("/api/categories", verifyToken, categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  handleError(err, res);
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
