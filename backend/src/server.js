import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messageRoute.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

// to get data that user send in the body
app.use(express.json());

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  connectDB();
});
