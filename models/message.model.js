// import mongoose, { Schema, model } from "mongoose";

import mongoose from "mongoose";
import User from "./user.model.js";

// const messageSchema = new Schema(
//   {
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     content: { type: String, required: true },

//     receiver: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("msg", messageSchema);

export default Message;
