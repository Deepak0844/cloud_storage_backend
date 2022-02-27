import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./routers/AuthRouter.js";
import { fileRouter } from "./routers/FileRouter.js";
import { usersRouter } from "./routers/UserRouter.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to db"))
  .catch((err) => console.log(err));

app.use("/auth", authRouter);
app.use("/user", usersRouter);
app.use("/file", fileRouter);

app.listen(PORT, () => {
  console.log("Server started", PORT);
});
