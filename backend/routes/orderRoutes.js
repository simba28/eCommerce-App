import express from 'express'
const router = express.Router()
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
    deleteOrderById,
    deleteOrderByUser
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/user/:userId').delete(protect, admin, deleteOrderByUser)
router.route('/:id')
    .get(protect, getOrderById)
    .delete(protect, admin, deleteOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
