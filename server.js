const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const errorHandler = require("./middlewares/errorMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(errorHandler);

// API Routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/openai", require("./routes/openai"));

const PORT = process.env.PORT || 8000;
// Default route
app.get("/", (req, res) => {
  res.send("API is running");
});
// Start the server
app.listen(PORT, () => {
  console.log(colors.bgCyan.white(`Server Running in ${process.env.DEV_MODE} mode on port no ${PORT}`));
});
