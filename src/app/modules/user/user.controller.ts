import { Request, Response } from 'express';
import { UserService } from './user.service';
import { userValidationSchema } from './user.zod.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const zodValidationSchema = userValidationSchema.parse(user);

    const result = await UserService.createUserIntoDB(zodValidationSchema);
    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

export const UserController = {
  createUser,
};
