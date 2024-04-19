var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var { connectToDatabase } = require("./src/mongo");
var app = express();
const PORT = 8090;

// Middleware for CORS
app.use(cors());

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "src/build")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Trust the proxy for secure requests
app.enable("trust proxy");

// Middleware to redirect HTTP to HTTPS

// app.use(function (req, res, next) {
//   if (!req.secure) {
//     res.redirect("https://" + req.headers.host + req.url);
//   } else {
//     next();
//   }
// });

const mainRouter = require("./src/routes/index");
app.use("/api", mainRouter);

// Catch-all route to serve the React App
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/build", "index.html"));
});
// Catch-all route to serve the React App
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "src/build", "index.html"));
});

// 404 handler
app.use(function (req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function (err, req, res, next) {
  // Set locals, only provide error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
});

// Connect to the database and start the server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening at ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  });

module.exports = app;
