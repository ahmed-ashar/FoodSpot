import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import { allOrder, placeOrder, placeOrderStripe, updateStatus, userOrder, verifyStripe } from '../controllers/orderControllers.js'
import authUser from '../middleware/auth.js'

const orderRoute = express.Router()

orderRoute.post('/list',adminAuth,allOrder)
orderRoute.post('/status',adminAuth,updateStatus)

orderRoute.post('/place',authUser,placeOrder)
orderRoute.post('/stripe',authUser,placeOrderStripe)

orderRoute.post('/userorders',authUser,userOrder)

orderRoute.post('verifyStripe',authUser,verifyStripe)

export default orderRoute