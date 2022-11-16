import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { validateSignup } from "./schemas.js";

const app = express();

//config
app.use(cors());
app.use(express.json());
dotenv.config();

//MongoClient
const mongoClient = new MongoClient(process.env.MONGO_URI);

//mongo
try {
  await mongoClient.connect();
} catch (error) {
  console.log(error);
}

const db = mongoClient.db("myWallet");
const usersCollection = db.collection("users");
const statementsCollection = db.collection("statements");

//code
app.post("/sign-up", async (req, res) => {
  const body = req.body;

  const { error } = validateSignup(body);
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }

  const encryptedPassword = bcrypt.hashSync(body.password, 10);

  try {
    await usersCollection.insertOne({
      ...body,
      password: encryptedPassword,
      lastStatus: Date.now(),
    });
    res.sendStatus(200);
  } catch (error) {
    res.send(500);
  }
});

//port
app.listen(5000, () => console.log("Server running in port 5000"));
