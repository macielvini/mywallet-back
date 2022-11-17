import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { signIn, signUp } from "./controllers/auth.controllers.js";
import { getStatement } from "./controllers/statement.controllers.js";

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
export const usersCollection = db.collection("users");
export const statementsCollection = db.collection("statements");
export const sessionsCollection = db.collection("sessions");

//code

//GET
app.get("/statement", getStatement);

//POST
app.post("/sign-up", signUp);

app.post("/sign-in", signIn);

//port
app.listen(5000, () => console.log("Server running in port 5000"));
