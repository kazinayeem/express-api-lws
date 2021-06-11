const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoschema = require("../schemas/todoschemas");
const Todo = new mongoose.model("Todo", todoschema);

// get all the todos
router.get("/", async (req, res) => {
  await Todo.find({ status: "active" }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
       
      });
    }
  });
});

// get a  todo by id
router.get("/:id", async (req, res) => {});

// POST A TODO
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      console.log("Todo was inserted successfully!");
      res.status(200).json({
        message: "Todo was inserted successfully!",
      });
    }
  });
});

// post multiple todo
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There were a server side error!",
      });
    } else {
      console.log("Todos were inserted successfully!");
      res.status(200).json({
        message: "Todos were inserted successfully!",
      });
    }
  });
});

// put todo
router.put("/:id", async (req, res) => {
  await Todo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        console.log("Todo was update successfully!");
        res.status(200).json({
          message: "Todo was update successfully!",
        });
      }
    }
  );
});
// delete todo
router.delete("/:id", async (req, res) => {

  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message:"todo was delete successfully"
       
      });
    }
  });
});

module.exports = router;
