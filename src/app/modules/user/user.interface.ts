import { Model } from 'mongoose';

export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: TOrders[] | null;
};

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<TUser | null>;
}
