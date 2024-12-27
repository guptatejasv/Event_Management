import { Schema, Document, model } from "mongoose";

export interface IAuth extends Document {
  role: string;
  email: string;
  password: string;
  phone: string;
  name?: string;
  dob?: Date;
  category?: string;
  photo?: string;
  isDeleted?: boolean;
  isBlocked?: boolean;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const AuthSchema: Schema = new Schema(
  {
    role: {
      type: String,
      default: "user",
      required: true,
      enum: ["admin", "vender", "user"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
    },
    dob: {
      type: Date,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
    },
    isBlocked: {
      type: Boolean,
    },
    category: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const User = model<IAuth>("User", AuthSchema);
