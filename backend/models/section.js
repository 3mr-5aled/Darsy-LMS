const mongoose = require("mongoose");

const Sections = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    total: {
      type: Number,
    },
    courseId: { type: mongoose.Types.ObjectId, ref: 'courses' },
    lessons: [{ type: mongoose.Types.ObjectId, ref: 'lessons' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("sections", Sections);
