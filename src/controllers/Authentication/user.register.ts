import { Request, Response } from "express";
import { User } from "../../model/user.model";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, category, role, email, password } = req.body;

    // Validate input
    if (!role || !email || !password || !name) {
      return res.status(400).json({
        status: "fail",
        message: "Please fill all required fields.",
      });
    }
    if (role == "vender") {
      if (!req.body.category) {
        return res.status(400).json({
          status: "fail",
          message: "Please Choose Category",
        });
      }
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      role,
      email,
      name,
      category,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully.",
      data: {
        user,
      },
    });
  } catch (err) {
    // General error response
    res.status(500).json({
      status: "fail",
      message: err || "Error: An error occurred during registration.",
    });
  }
};
