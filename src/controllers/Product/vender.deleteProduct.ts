import { Request, Response } from "express";
import { User } from "../../model/user.model";
import { Product } from "../../model/products.model";

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const pro_id = req.params.id;
    const user = req.user;
    const vender = await User.findById(user.id);
    if (vender) {
      if (vender.role == "vender") {
        const product = await Product.findById(pro_id);
        if (product) {
          if (product.isDeleted == true || product.isBlocked == true) {
            return res.status(400).json({
              status: "fail",
              message: `You cann't deleted this Product. This product has been deleted or Blocked by admin..`,
            });
          }
        }
        if (product) {
          product.isDeleted = true;
          await product.save();
        }

        return res.status(200).json({
          status: "success",
          message: "Product deleted successfully..",
        });
      }
    }
    return res.status(401).json({
      status: "fail",
      message: "You are unautherized to delete products.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
