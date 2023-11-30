import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

//create user
router.post('/api/users', UserController.createUser);

//get all user
router.get('/api/users', UserController.getAllUsers);
// router.get('/', UserController.getAllUsers);
//

//get single user
router.get('/api/users/:userId', UserController.getSingleUsers);

//delete route
router.delete('/api/users/:userId', UserController.deleteSingleUsers);

//update user
router.put('/api/users/:userId', UserController.updateSingleUser);
// router.put('/api/users/:userId', UserController.updateSingleUsers);

export const UserRoutes = router;
