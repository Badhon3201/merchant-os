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