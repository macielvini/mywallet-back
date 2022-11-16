import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const app = express();

//config
app.use(cors());
app.use(express.json());
dotenv.config();

//MongoClient
const mongoClient = new MongoClient(process.env.MONGO_URI);

//conectar Mongo
try {
  await mongoClient.connect();
} catch (error) {
  console.log(error);
}

const db = mongoClient.db("myWallet");

//code

//port
app.listen(5000, () => console.log("Server running in port 5000"));
