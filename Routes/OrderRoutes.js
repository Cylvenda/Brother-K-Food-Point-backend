import express from 'express'
import authMiddleware from '../Middleware/auth.js'
import { placeOrder, userOrders, verifyOrder } from '../Controllers/OrderController.js'

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder)
orderRouter.post('/userOrders', authMiddleware, userOrders)


export default orderRouter