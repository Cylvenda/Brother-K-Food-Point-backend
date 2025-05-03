import express from "express"
import { addToCart, getCart, removeFromCart } from "../Controllers/CartController.js";
import authMiddleware from "../Middleware/auth.js";



const cartRouter = express.Router();

cartRouter.post("/addCart", authMiddleware, addToCart)
cartRouter.post("/removeCart", authMiddleware, removeFromCart)
cartRouter.post("/getCart", authMiddleware, getCart)

export default cartRouter