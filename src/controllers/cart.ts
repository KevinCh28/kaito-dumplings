import { Request, Response } from 'express';
import { getUserCart } from '../utils/cart_api_util';
import User from '../database/schemas/User';

export async function getCartController(req: Request, res: Response) {
  
  try {
    const { data } = await getUserCart(User.id);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error')
  }
}