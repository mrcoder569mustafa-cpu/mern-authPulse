import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import AuthRouter from "./Routes/AuthRouter.js";
import ProductRouter from "./Routes/ProductRouter.js";
import "./Models/db.js"; // MongoDB connection

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT || 3000;

// Test route
app.get("/", (req, res) => res.send("backend is running"));

// Routes
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

// Start local server

app.listen(PORT, () => {
  console.log(`Server running locally on port ${PORT}`);
});
