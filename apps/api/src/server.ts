import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import prisma from "./database/prisma";
import authRoutes from "./modules/auth/auth.routes";
import companyRoutes from "./modules/company/company.routes";
import roleRoutes from "./modules/role/role.route";
import permissionRoutes from "./modules/permission/permission.route";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const allowOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.get("/db-test", async (_, res) => {
  const result = await prisma.$queryRaw`SELECT NOW()`;

  res.json(result);
});

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Merchant OS API is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});