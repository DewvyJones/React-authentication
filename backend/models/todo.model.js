const mongoose = require("mongoose");

const TodoData = new mongoose.Schema(
  {
    title: { type: String, required: true },
    deadline: { type: Date, required: true },
    createBy: { type: String, required: true },
  },
  { timestamps: true },
  { collection: "todos" }
);

module.exports = mongoose.model("Todo", TodoData);
