import mongoose, { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;
