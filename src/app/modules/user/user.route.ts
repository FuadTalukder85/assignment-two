import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

//create user
router.post('/', UserController.createUser);

//get all user
router.get('/', UserController.getAllUsers);

//get single user
router.get('/:userId', UserController.getSingleUsers);

//update user
router.put('/:userId', UserController.updateUser);

//delete route
router.delete('/:userId', UserController.deleteSingleUsers);

// addOrders
router.put('/:userId/orders', UserController.addOrders);

//get orders
router.get('/:userId/orders', UserController.getOrders);

// get total price
router.get('/:userId/orders/total-price', UserController.getTotalPrice);

export const UserRoutes = router;
