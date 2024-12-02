// src\models\UserInfo.js
import { Schema, model, models } from "mongoose";

const UserInfoSchema = new Schema({
  email: { type: String, required: true, unique: true },
  image: { type: String },
  admin: { type: Boolean, default: false },
  phone: { type: String },
  streetAddress: { type: String },
}, { timestamps: true });

export const UserInfo = models.UserInfo || model("UserInfo", UserInfoSchema);
