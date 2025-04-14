import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import authRoutes from "./routes/auth_routes.js";
import messageRoutes from "./routes/message_routes.js";
import { app, server } from "./configs/socket.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

app.use(
  cors({
    origin: "https://chat-frontend-one-omega.vercel.app/",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 8081;


// Error-handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  if (err instanceof AggregateError) {
    console.error("AggregateError cause:", err.cause);
  }
  res.status(500).json({ error: "Internal Server Error" });
});

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
