const express = require("express");
const Todo = require("../models/todo.model");
const { auth } = require("../middlewares/Auth");
const router = express.Router();

router.get("/api/todo", auth, async (req, res) => {
  const email = req.user.email;
  try {
    const allTodo = await Todo.find({
      createBy: email,
    });
    res.status(200).json({ allTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "Can't find todo!" });
  }
});

router.post("/api/create/todo", auth, async (req, res) => {
  const formData = req.body.formData;
  if (!formData) {
    res.status(400).json({ message: "No info" });
  }
  try {
    await Todo.create({
      title: formData.title,
      deadline: formData.deadline,
      createBy: formData.createBy,
    });
    res.status(200).json({ message: "Todo has been created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "Create Todo fail!" });
  }
});

exports.router = router;
