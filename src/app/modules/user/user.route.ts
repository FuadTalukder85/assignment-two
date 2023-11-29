import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

//create user
router.post('/api/users', UserController.createUser);

//get all user
router.get('/api/users', UserController.getAllUsers);

export const UserRoutes = router;
