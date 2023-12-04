import { z } from 'zod';
const OrderSchema = z.object({
  productName: z.string().min(1, { message: 'productName is required' }),
  price: z.number().min(1, { message: 'price in required' }),
  quantity: z.number().min(1),
});

const UserValidationSchema = z.object({
  userId: z.number().int().positive('Id must be a positive number'),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(20, { message: 'Password can not be more than 20' }),
  fullName: z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
  }),
  age: z.number().int().positive('Age must be a positive number'),
  email: z
    .string()
    .email('Invalid email format')
    .min(1, { message: 'Email is required' }),
  isActive: z.boolean({
    required_error: 'isActive is required',
    invalid_type_error: 'isActive must be boolean',
  }),
  hobbies: z.array(
    z.string().min(1, { message: 'At least one hobby is required' }),
  ),
  address: z.object({
    street: z.string().min(1, { message: 'Street is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
  }),
  orders: z.array(OrderSchema).nullable().optional(),
});

export { UserValidationSchema, OrderSchema };
