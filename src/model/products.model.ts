import { Schema, Document, model, ObjectId } from "mongoose";

export interface IProduct extends Document {
  venderId: ObjectId;
  productName: string;
  description: string;
  productImg: string;
  price: number;
  stock?: number;
  isBlocked?: boolean;
  isBlockedBy?: ObjectId;
  isDeleted: boolean;
}

const AuthSchema: Schema = new Schema(
  {
    venderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    productImg: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isBlockedBy: {
      type: Schema.Types.ObjectId,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Product = model<IProduct>("Product", AuthSchema);
