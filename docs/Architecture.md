# Merchant OS Architecture

## Overview
Merchant OS is a multi-tenant SaaS CRM and commerce backend built on Node.js, Express, TypeScript, and PostgreSQL via Prisma.

## Layered Architecture

### 1. Presentation Layer
- Express routes
- HTTP controllers
- Request validation

### 2. Application Layer
- Services for auth, company, role, and permission management
- Business rules and orchestration

### 3. Data Access Layer
- Prisma repository pattern
- Database models for Company, User, Role, Permission, Product, Customer, Order, Expense, and more

### 4. Shared Infrastructure
- JWT utilities
- password hashing helpers
- standard API response wrappers
- middleware for auth enforcement

## Core Domain Modules
- Auth
- Company
- Role
- Permission
- Customer
- Product
- Order
- Expense
- Inventory
- Reporting

## Multi-tenancy Model
Each tenant is represented by a Company record. Users belong to a company, and roles and permissions are scoped to the company.

## Security Model
- JWT-based access tokens
- company-scoped user lookups
- role-based permission assignment
- middleware-protected endpoints

## Default RBAC Design
Default roles and permissions are seeded at the company level so every tenant starts with a working permission model.

## Future Expansion
This architecture supports adding modules such as:
- CRM leads and pipeline
- sales commissions
- accounting and invoices
- procurement and suppliers
- reporting dashboards
