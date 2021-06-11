const express = require("express");
const mongoose = require("mongoose");
const mainrouter = require("./routeHandeler/mainrouter")
const todoHandeler = require("./routeHandeler/todoHandeler");

// express app initialization
const app = express();
app.use(express.json());



// database connection with mongoose
mongoose
  .connect("mongodb://localhost/file", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));



//   main route 
app.use('/',mainrouter )
// application route

app.use("/todos", todoHandeler);
 
// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  }

// server running port 3000
app.listen(5000, () => {
    console.log("app listening at port 5000");
  });
  