# Database Design

## Core Models

### Company
Represents a tenant/business account in the SaaS system.

### User
Represents an employee or admin inside a company.

### Role
Represents a named permission group for a company.

### Permission
Represents a specific capability such as users.read or products.update.

### RolePermission
Join table that connects a role to many permissions.

## Relationships
- Company has many Users
- Company has many Roles
- User belongs to one Company and optional Role
- Role has many Permissions through RolePermission
- Permission belongs to many Roles through RolePermission

## Default Seed Data
The system seeds default roles and permissions when a company is created or when permissions are initialized for a tenant.

## Important Design Rule
All critical queries should include companyId filtering to keep data scoped to the tenant.
