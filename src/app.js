import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.router.js";
import statementRouter from "./routes/statement.router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(statementRouter);

app.listen(5000, () => console.log("Server running in port 5000"));
