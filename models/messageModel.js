const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    text: {
      type: String,
      required: true,
    },
  },
  users: Array,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

messageSchema.index({ users: 1, createdAt: -1 });
messageSchema.index({ sender: 1, read: 1 });

module.exports = mongoose.model("Messages", messageSchema);
