import axios from "axios";
import { ObjectId } from "mongoose";
import User from "../database/schemas/User";

export async function getUserCart(id: ObjectId) {
  const user = await User.findById(id);
  if (!user) throw new Error('No user found');
  return axios.get(`/api/users/@me/cart`)
}