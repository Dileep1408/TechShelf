import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import resourcesRouter from "./routes/resources.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/resources", resourcesRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("TechShelf Backend is running");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend is working",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
