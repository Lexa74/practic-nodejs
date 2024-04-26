import express from "express";
import userRouter from "./routing/userRoutes";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.use(userRouter);

const port = 3001;

mongoose
  .connect(
    "mongodb+srv://admin:admin@maincluster.ejjytjx.mongodb.net/?retryWrites=true&w=majority&appName=MainCluster",
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
