import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { validateSignin, validateSignup } from "./schemas.js";

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
const sessionsCollection = db.collection("sessions");

//code

//POST
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

app.post("/sign-in", async (req, res) => {
  const body = req.body;

  const { error } = validateSignin(body);
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }

  try {
    const user = await usersCollection.findOne({ email: body.email });
    if (!user) {
      return res.sendStatus(401);
    }

    if (!bcrypt.compareSync(body.password, user.password)) {
      return res.sendStatus(401);
    }

    const session = await sessionsCollection.findOne({
      userId: ObjectId(user._id),
    });

    if (!session?.token) {
      const newToken = uuid();
      await sessionsCollection.insertOne({
        userId: user._id,
        token: newToken,
      });

      return res.send({ token: newToken });
    }

    res.send({ token: session.token });
  } catch (error) {
    res.sendStatus(500);
  }
});

//port
app.listen(5000, () => console.log("Server running in port 5000"));
