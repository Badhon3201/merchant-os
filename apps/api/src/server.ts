import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Merchant OS API is running 🚀",
  });
});

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});