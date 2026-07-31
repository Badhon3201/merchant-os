import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting seed...");

  const company = await prisma.company.create({
    data: {
      name: "Demo Company",
      email: "demo@company.com",
      phone: "01700000000",
      address: "Dhaka, Bangladesh",
    },
  });

  console.log("Company created:", company.name);

  const permissions = await Promise.all([
    prisma.permission.create({
      data: {
        name: "Create Product",
        resource: "PRODUCT",
        action: "CREATE",
      },
    }),

    prisma.permission.create({
      data: {
        name: "Read Product",
        resource: "PRODUCT",
        action: "READ",
      },
    }),

    prisma.permission.create({
      data: {
        name: "Update Product",
        resource: "PRODUCT",
        action: "UPDATE",
      },
    }),

    prisma.permission.create({
      data: {
        name: "Delete Product",
        resource: "PRODUCT",
        action: "DELETE",
      },
    }),

    prisma.permission.create({
      data: {
        name: "Create Customer",
        resource: "CUSTOMER",
        action: "CREATE",
      },
    }),

    prisma.permission.create({
      data: {
        name: "Read Customer",
        resource: "CUSTOMER",
        action: "READ",
      },
    }),

    prisma.permission.create({
      data: {
        name: "Create Order",
        resource: "ORDER",
        action: "CREATE",
      },
    }),

    prisma.permission.create({
      data: {
        name: "Read Order",
        resource: "ORDER",
        action: "READ",
      },
    }),
  ]);

  const adminRole = await prisma.role.create({
    data: {
      companyId: company.id,
      name: "ADMIN",
    },
  });

  await prisma.rolePermission.createMany({
    data: permissions.map((permission) => ({
      roleId: adminRole.id,
      permissionId: permission.id,
    })),
  });

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.create({
    data: {
      companyId: company.id,
      roleId: adminRole.id,
      name: "Admin",
      email: "admin@company.com",
      password: hashedPassword,
    },
  });

  console.log("Admin created:", admin.email);
  console.log("🌱 Seed completed!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });