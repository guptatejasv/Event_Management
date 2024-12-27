import { Request, Response } from "express";
import { User } from "../../model/user.model";
import { Product } from "../../model/products.model";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const vender = await User.findById(user.id);

    if (vender) {
      if (vender.role == "vender") {
        const { productName, productImg, description, price } = req.body;

        const product = await Product.create({
          venderId: user.id,
          productImg,
          productName,
          description,
          price,
        });

        return res.status(201).json({
          status: "success",
          message: "Product Added Successfully..",
          data: {
            product,
          },
        });
      }
    }
    return res.status(401).json({
      status: "fail",
      message: "You are unautherized to add products.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
