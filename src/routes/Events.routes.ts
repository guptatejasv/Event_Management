import { Router } from "express";
import { register } from "../controllers/Authentication/user.register";
import { login } from "../controllers/Authentication/user.login";
import { addProduct } from "../controllers/Product/vender.addProduct";
import { verify_token } from "../helper/jwtVerify";
import { getProducts } from "../controllers/Product/vender.getProduct";
import { deleteProduct } from "../controllers/Product/vender.deleteProduct";
import { updateProduct } from "../controllers/Product/vender.updateProduct";

const router = Router();

router.post("/auth/user/login", login);
router.post("/auth/user/register", register);
router.post("/vender/addProduct", verify_token, addProduct);
router.get("/vender/getProducts", verify_token, getProducts);
router.delete("/vender/deleteProduct/:id", verify_token, deleteProduct);
router.patch("/vender/updateProduct/:id", verify_token, updateProduct);

export default router;
