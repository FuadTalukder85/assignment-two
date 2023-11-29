import { Request, Response } from 'express';
import { UserService } from './user.service';
import { userValidationSchema } from './user.zod.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    // const userValidationSchema = z.object({
    //   userId: z.number(),
    //   userName: z.string(),
    //   password: z.string(),
    //   fullName: z.object({
    //     firstName: z.string(),
    //     lastName: z.string(),
    //   }),
    // });

    const user = req.body.user;
    const zodValidationSchema = userValidationSchema.parse(user);

    const result = await UserService.createUserIntoDB(zodValidationSchema);
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
