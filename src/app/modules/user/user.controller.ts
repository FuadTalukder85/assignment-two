import { Request, Response } from 'express';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body.user);
    const userr = req.body.user;

    const result = await UserService.createUserIntoDB(userr);
    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserController = {
  createUser,
};
