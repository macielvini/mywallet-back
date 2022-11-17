import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
} catch (error) {
  console.log(error);
}

const db = mongoClient.db("myWallet");
export const usersCollection = db.collection("users");
export const statementsCollection = db.collection("statements");
export const sessionsCollection = db.collection("sessions");
