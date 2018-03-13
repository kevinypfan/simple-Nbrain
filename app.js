require('./config/config.js');

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./api/routes/user");
const teamRoutes = require("./api/routes/team");
const systemRoutes = require("./api/routes/system");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL);

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/system', systemRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
