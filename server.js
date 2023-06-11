const path = require("path");
const ejs = require("ejs");
const hpp = require("hpp");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const fileupload = require("express-fileupload");
const errorHandler = require("./src/middleware/error");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const dotenv = require('dotenv');
 

// Load env vars
dotenv.config({path: './config.env'});


// Load env vars
mongoose.connect(process.env.MONGO_URI_DEV, {
  // createInd
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


// Route files in

const auth = require("./src/routes/auth");
const user = require("./src/routes/users");
const article = require("./src/routes/articles");
const comments = require("./src/routes/comments");
const category = require("./src/routes/categories");

// const auth = require("./routes/auth");
// const user = require("./routes/users");
// const article = require("./routes/articles");
// const comments = require("./routes/comments");
// const category = require("./routes/categories");

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", user);
app.use("/api/v1/articles", article);
app.use("/api/v1/comments", comments);
app.use("/api/v1/categories", category);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});

