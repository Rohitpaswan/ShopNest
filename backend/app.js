const express = require("express");
const bodyParser = require("body-parser");
var createError = require("http-errors");
const Seedrouter = require("./routes/seedRouter");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const { errorResponse } = require("./controllers/responseController");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//client side error handling

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Api",
  });
});
app.use("/api/user", userRoute);
app.use("/seed/api", Seedrouter);
app.use("/api/v1/category", categoryRoute);

// app.get("/signup",(req,res) => {
//   const {email ,password} = req.body;
//   res.status(200).json({
//     email: email,
//     password: password
//   });
// });

//client side error handling
app.use((req, res, next) => {
  next(createError(404, "Route Error"));
});

//server side error handling
app.use((err, req, res, next) => {
  console.log("server error", err.message);
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});
module.exports = app;
