import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../../../lib/connectToDatabse";

export default async function handler(req: Request, res: Response) {
  try {
    const mongoClient = await connectToDatabase() as MongoClient;
    const db = mongoClient.db("test");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};