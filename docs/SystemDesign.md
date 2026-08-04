# Merchant OS System Design

## Goals
- Multi-tenant SaaS backend
- CRM and commerce management for business operations
- Secure login and company-scoped authorization
- Role-based access control (RBAC)

## Components

### API Layer
Express.js server with modular route definitions for:
- Auth
- Company
- Role
- Permission

### Business Layer
Each module contains:
- controller
- service
- repository
- validation

### Persistence Layer
Prisma ORM with PostgreSQL. Core entities include:
- Company
- User
- Role
- Permission
- Customer
- Product
- Order
- Expense

## Authentication Flow
1. User sends login credentials
2. Server validates against company-scoped user record
3. JWT access token and refresh token are issued
4. Protected routes validate token through middleware

## Authorization Flow
1. Company is associated with user
2. User has one role
3. Role is linked to multiple permissions
4. Middleware verifies access for protected endpoints

## Data Isolation
All company data is isolated using companyId filters in repository queries.

## Scalability Notes
- Service and repository separation keep modules easy to extend
- Prisma abstracts database complexity
- Modular architecture allows adding new SaaS modules without breaking core auth
