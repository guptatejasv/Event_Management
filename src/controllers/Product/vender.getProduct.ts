import { Request, Response } from "express";
import { User } from "../../model/user.model";
import { Product } from "../../model/products.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    // Check if the user is authenticated and has the role of "seller"
    const vender = await User.findById(user.id);
    if (!vender || vender.role !== "vender") {
      return res.status(401).json({
        status: "fail",
        message: "You are unauthorized to view products.",
      });
    }

    // Extract page and limit from query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch products with pagination and limit
    const products = await Product.find({
      venderId: user.id,
      isDeleted: false,
      isBlocked: false,
    })
      .skip(skip)
      .limit(limit);

    // Get the total count of products
    const totalProducts = await Product.countDocuments({
      venderId: user.id,
      isDeleted: false,
      isBlocked: false,
    });

    res.status(200).json({
      status: "success",
      result: products.length,
      data: {
        products,
      },
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
