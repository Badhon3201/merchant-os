# Merchant OS API

## Overview
This API powers a SaaS-based CRM and commerce platform for multi-company operations. The backend supports authentication, company management, roles, permissions, and future CRM modules.

## Authentication

### Register
POST /api/auth/register

Body:
{
  "companyId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}

### Login
POST /api/auth/login

Body:
{
  "companyId": 1,
  "email": "john@example.com",
  "password": "secret123"
}

### Me
GET /api/auth/me

Requires: Bearer token

### Refresh Token
POST /api/auth/refresh-token

Body:
{
  "refreshToken": "..."
}

### Logout
POST /api/auth/logout

Requires: Bearer token

## Company

### Get company
GET /api/company/companies

Requires: Bearer token

### Update company
PUT /api/company/update

Requires: Bearer token

## Roles

### Get all roles
GET /api/roles

Requires: Bearer token

### Create role
POST /api/roles

Body:
{
  "name": "Manager"
}

### Update role
PATCH /api/roles/:id

Body:
{
  "name": "Sales Lead"
}

### Delete role
DELETE /api/roles/:id

## Permissions

### Get all permissions
GET /api/permissions

Requires: Bearer token

### Assign permissions to role
POST /api/roles/:id/permissions

Body:
{
  "permissionIds": [1, 2, 5]
}

## Default Roles
- Super Admin
- Admin
- Manager
- Sales
- Cashier
- Inventory Manager
- Accountant
- Support

## Default Permissions
- dashboard.view
- users.create
- users.read
- users.update
- users.delete
- roles.create
- roles.read
- roles.update
- roles.delete
- customers.create
- customers.read
- customers.update
- customers.delete
- products.create
- products.read
- products.update
- products.delete
- orders.create
- orders.read
- orders.update
- orders.delete
- expenses.create
- expenses.read
- expenses.update
- expenses.delete
- reports.view
- settings.manage
- company.manage
