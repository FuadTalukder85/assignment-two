import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

//create user
router.post('/api/users', UserController.createUser);

//get all user
router.get('/api/users', UserController.getAllUsers);

//get single user
router.get('/api/users/:userId', UserController.getSingleUsers);

//delete route
router.delete('/api/users/:userId', UserController.deleteSingleUsers);

// addOrders
router.put('/api/users/:userId/orders', UserController.addOrders);

//get orders
router.get('/api/users/:userId/orders', UserController.getOrders);

export const UserRoutes = router;
