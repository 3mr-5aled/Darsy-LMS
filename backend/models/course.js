const mongoose = require("mongoose");

const Courses = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    courseImg: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    total: {
      type: String,
    },
    language: {
      required: true,
      type: String,
    },
    sections: [ {type:mongoose.Types.ObjectId,ref:'sections'}],
  },
  { timestamps: true }
);

module.exports = mongoose.model("courses", Courses);
