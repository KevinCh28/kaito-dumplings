import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../../../lib/connectToDatabse";

export default async function handler(req: Request, res: Response) {
  try {
    const mongoClient = await connectToDatabase() as MongoClient;
    const db = mongoClient.db("test");
    const productsCollection = db.collection("products");
    const results = await productsCollection.find().toArray();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};