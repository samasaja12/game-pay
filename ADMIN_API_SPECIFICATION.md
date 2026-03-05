# 🔌 Admin Dashboard API Specification

## Overview
Dokumentasi lengkap API endpoints yang diperlukan untuk Admin Dashboard integration dengan backend.

---

## Authentication

### Admin Login
```http
POST /api/auth/admin/login
Content-Type: application/json

{
  "token": "google-oauth-token"
}

Response 200: OK
{
  "success": true,
  "user": {
    "id": "user-123",
    "name": "Admin Name",
    "email": "admin@gamepay.com",
    "role": "admin",
    "permissions": ["read", "write", "delete"]
  },
  "accessToken": "jwt-token-here",
  "refreshToken": "refresh-token-here"
}

Response 401: Unauthorized
{
  "success": false,
  "message": "User is not authorized as admin"
}
```

### Verify Admin Token
```http
POST /api/auth/verify
Authorization: Bearer <jwt-token>

Response 200: OK
{
  "valid": true,
  "user": { /* user data */ }
}

Response 401: Unauthorized
{
  "valid": false,
  "message": "Token expired or invalid"
}
```

---

## Dashboard Statistics

### Get Dashboard Overview
```http
GET /api/admin/dashboard/stats
Authorization: Bearer <jwt-token>

Query Parameters:
  - period: "today" | "week" | "month" | "year" (default: "month")
  - startDate: "2024-01-01" (ISO format)
  - endDate: "2024-12-31" (ISO format)

Response 200: OK
{
  "stats": {
    "totalTransactions": {
      "value": 45200000,
      "change": 12.5,
      "currency": "IDR"
    },
    "totalUsers": {
      "value": 8245,
      "change": 8.2,
      "unit": "users"
    },
    "transactionsToday": {
      "value": 1234,
      "change": 23.1,
      "unit": "transactions"
    },
    "revenue": {
      "value": 2300000,
      "change": 5.4,
      "currency": "IDR"
    }
  },
  "timestamp": "2024-03-05T10:30:00Z"
}
```

### Get Transaction Trend Chart
```http
GET /api/admin/dashboard/trend
Authorization: Bearer <jwt-token>

Query Parameters:
  - days: 7 | 14 | 30 (default: 7)

Response 200: OK
{
  "data": [
    {
      "date": "2024-02-27",
      "transactions": 45,
      "revenue": 3500000
    },
    {
      "date": "2024-02-28",
      "transactions": 52,
      "revenue": 4200000
    },
    // ... more data points
  ]
}
```

### Get Transaction Status Summary
```http
GET /api/admin/dashboard/status-summary
Authorization: Bearer <jwt-token>

Response 200: OK
{
  "summary": {
    "successful": {
      "count": 7225,
      "percentage": 85.00
    },
    "pending": {
      "count": 850,
      "percentage": 10.00
    },
    "failed": {
      "count": 425,
      "percentage": 5.00
    }
  }
}
```

---

## Transactions Management

### Get All Transactions
```http
GET /api/admin/transactions
Authorization: Bearer <jwt-token>

Query Parameters:
  - page: 1 (default: 1)
  - limit: 20 (default: 20)
  - search: "search-term" (search user name or product)
  - status: "successful" | "pending" | "failed"
  - sortBy: "date" | "amount" (default: "date")
  - sortOrder: "asc" | "desc" (default: "desc")
  - startDate: "2024-01-01"
  - endDate: "2024-12-31"

Response 200: OK
{
  "success": true,
  "data": [
    {
      "id": "tx-123",
      "userId": "user-456",
      "userName": "Andri Wijaya",
      "userEmail": "andri@gmail.com",
      "userImage": "https://...",
      "productId": "prod-789",
      "productName": "Diamond MLBB 250",
      "productCategory": "game",
      "amount": 75000,
      "currency": "IDR",
      "status": "successful",     // "successful" | "pending" | "failed"
      "paymentMethod": "google_pay",
      "commission": 3750,          // 5%
      "netRevenue": 71250,
      "createdAt": "2024-03-05T10:30:00Z",
      "completedAt": "2024-03-05T10:32:15Z",
      "notes": "Transaction completed successfully"
    },
    // ... more transactions
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 8500,
    "pages": 425
  }
}
```

### Get Transaction Detail
```http
GET /api/admin/transactions/:id
Authorization: Bearer <jwt-token>

Response 200: OK
{
  "success": true,
  "data": {
    "id": "tx-123",
    "userId": "user-456",
    "userName": "Andri Wijaya",
    "userEmail": "andri@gmail.com",
    "userPhone": "081234567890",
    "userImage": "https://...",
    "productDetails": {
      "id": "prod-789",
      "name": "Diamond MLBB 250",
      "category": "game",
      "price": 75000,
      "quantity": 1
    },
    "payment": {
      "method": "google_pay",
      "status": "completed",
      "amount": 75000,
      "tax": 0,
      "fee": 0,
      "net": 75000
    },
    "timestamps": {
      "initiated": "2024-03-05T10:30:00Z",
      "processing": "2024-03-05T10:30:45Z",
      "completed": "2024-03-05T10:32:15Z"
    },
    "notes": "Transaction completed successfully"
  }
}
```

### Update Transaction Status
```http
PATCH /api/admin/transactions/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "status": "successful" | "pending" | "failed",
  "notes": "Admin override reason"
}

Response 200: OK
{
  "success": true,
  "message": "Transaction status updated",
  "data": { /* updated transaction */ }
}
```

### Export Transactions
```http
POST /api/admin/transactions/export
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "format": "csv" | "pdf" | "xlsx",
  "filters": {
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "status": "successful",
    "minAmount": 0,
    "maxAmount": 10000000
  }
}

Response 200: OK
{
  "success": true,
  "downloadUrl": "https://api.gamepay.com/downloads/tx-export-123.csv",
  "fileName": "transactions-2024-01-to-12.csv",
  "createdAt": "2024-03-05T10:40:00Z"
}
```

---

## Users Management

### Get All Users
```http
GET /api/admin/users
Authorization: Bearer <jwt-token>

Query Parameters:
  - page: 1 (default: 1)
  - limit: 20 (default: 20)
  - search: "search-term" (email, phone, name)
  - status: "active" | "inactive" | "suspended"
  - sortBy: "joinDate" | "name" | "lastActive"
  - sortOrder: "asc" | "desc"
  - minJoinDate: "2024-01-01"
  - maxJoinDate: "2024-12-31"

Response 200: OK
{
  "success": true,
  "data": [
    {
      "id": "user-456",
      "name": "Andri Wijaya",
      "email": "andri@gmail.com",
      "phone": "081234567890",
      "image": "https://...",
      "status": "active",          // "active" | "inactive" | "suspended"
      "joinDate": "2024-11-15",
      "lastActiveAt": "2024-03-05T08:20:00Z",
      "totalTransactions": 15,
      "totalSpent": 1250000,
      "verified": true,
      "verificationDate": "2024-11-15T10:00:00Z"
    },
    // ... more users
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 8245,
    "pages": 413
  }
}
```

### Get User Detail
```http
GET /api/admin/users/:id
Authorization: Bearer <jwt-token>

Response 200: OK
{
  "success": true,
  "data": {
    "id": "user-456",
    "name": "Andri Wijaya",
    "email": "andri@gmail.com",
    "phone": "081234567890",
    "image": "https://...",
    "bio": "Gaming enthusiast",
    "status": "active",
    "joinDate": "2024-11-15T10:00:00Z",
    "lastActiveAt": "2024-03-05T08:20:00Z",
    "verified": true,
    "verificationDate": "2024-11-15T10:00:00Z",
    "statistics": {
      "totalTransactions": 15,
      "totalSpent": 1250000,
      "averageTransaction": 83333,
      "lastTransaction": "2024-03-03T14:30:00Z"
    },
    "paymentMethods": [
      {
        "id": "pm-123",
        "type": "credit_card",
        "label": "Visa 4242",
        "isDefault": true
      }
    ],
    "notifications": {
      "emailNotifications": true,
      "pushNotifications": true,
      "smsNotifications": false
    },
    "notes": "VIP customer"
  }
}
```

### Create New User
```http
POST /api/admin/users
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@gmail.com",
  "phone": "0812345678901",
  "initialCredit": 50000,
  "notes": "Manual user creation"
}

Response 201: Created
{
  "success": true,
  "message": "User created successfully",
  "data": { /* new user data */ }
}
```

### Update User
```http
PATCH /api/admin/users/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "status": "active" | "inactive" | "suspended",
  "notes": "Admin notes about user",
  "verified": true | false
}

Response 200: OK
{
  "success": true,
  "message": "User updated",
  "data": { /* updated user data */ }
}
```

### Delete User
```http
DELETE /api/admin/users/:id
Authorization: Bearer <jwt-token>

Response 200: OK
{
  "success": true,
  "message": "User deleted (soft delete - data preserved)"
}
```

---

## Products Management

### Get All Products
```http
GET /api/admin/products
Authorization: Bearer <jwt-token>

Query Parameters:
  - page: 1 (default: 1)
  - limit: 50 (default: 50)
  - search: "search-term"
  - category: "game" | "pulsa" | "data" | "utility" | "hiburan"
  - status: "active" | "inactive"
  - sortBy: "name" | "price" | "sales"
  - sortOrder: "asc" | "desc"

Response 200: OK
{
  "success": true,
  "data": [
    {
      "id": "prod-789",
      "name": "Diamond MLBB 250",
      "category": "game",
      "description": "Mobile Legends Bang Bang Diamond 250",
      "price": 75000,
      "currency": "IDR",
      "stock": -1,               // -1 = unlimited
      "commission": 5.00,        // percentage
      "status": "active",        // "active" | "inactive"
      "image": "https://...",
      "totalSales": 1245,
      "totalRevenue": 93375000,
      "rating": 4.8,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-03-05T08:00:00Z"
    },
    // ... more products
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 250,
    "pages": 5
  },
  "summary": {
    "totalProducts": 250,
    "activeProducts": 245,
    "inactiveProducts": 5,
    "totalRevenue": 45200000
  }
}
```

### Get Product Detail
```http
GET /api/admin/products/:id
Authorization: Bearer <jwt-token>

Response 200: OK
{
  "success": true,
  "data": {
    "id": "prod-789",
    "name": "Diamond MLBB 250",
    "category": "game",
    "description": "Mobile Legends Bang Bang Diamond 250",
    "price": 75000,
    "currency": "IDR",
    "stock": -1,
    "commission": 5.00,
    "status": "active",
    "image": "https://...",
    "gallery": ["url1", "url2", "url3"],
    "details": {
      "provider": "Moonton",
      "region": "Global",
      "instant": true
    },
    "pricing": {
      "baseCost": 71250,
      "sellingPrice": 75000,
      "margin": 3750
    },
    "statistics": {
      "totalSales": 1245,
      "totalRevenue": 93375000,
      "averageRating": 4.8,
      "totalReviews": 342,
      "lastSaleDate": "2024-03-05T08:20:00Z"
    }
  }
}
```

### Create Product
```http
POST /api/admin/products
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data

{
  "name": "New Product",
  "category": "game",
  "description": "Product description",
  "price": 100000,
  "stock": -1,
  "commission": 5.00,
  "image": <binary>,
  "baseCost": 95000
}

Response 201: Created
{
  "success": true,
  "message": "Product created",
  "data": { /* new product data */ }
}
```

### Update Product
```http
PATCH /api/admin/products/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 100000,
  "commission": 5.50,
  "status": "active" | "inactive",
  "stock": 0
}

Response 200: OK
{
  "success": true,
  "message": "Product updated",
  "data": { /* updated product data */ }
}
```

### Delete Product
```http
DELETE /api/admin/products/:id
Authorization: Bearer <jwt-token>

Response 200: OK
{
  "success": true,
  "message": "Product deleted (soft delete)"
}
```

---

## Analytics

### Get Revenue Analytics
```http
GET /api/admin/analytics/revenue
Authorization: Bearer <jwt-token>

Query Parameters:
  - period: "today" | "week" | "month" | "year"
  - groupBy: "category" | "product" | "date"

Response 200: OK
{
  "total": 45200000,
  "byCategory": [
    {
      "category": "game",
      "revenue": 15800000,
      "percentage": 35.00,
      "transactions": 215,
      "avgTransaction": 73488
    },
    // ... more categories
  ]
}
```

### Get Top Products
```http
GET /api/admin/analytics/top-products
Authorization: Bearer <jwt-token>

Query Parameters:
  - limit: 10 (default: 10)
  - sortBy: "sales" | "revenue" (default: "sales")
  - period: "week" | "month" | "year"

Response 200: OK
{
  "products": [
    {
      "rank": 1,
      "productId": "prod-789",
      "productName": "Diamond MLBB 250",
      "sales": 1245,
      "revenue": 93375000,
      "rating": 4.8
    },
    // ... more products
  ]
}
```

### Get Traffic & Conversion
```http
GET /api/admin/analytics/traffic
Authorization: Bearer <jwt-token>

Query Parameters:
  - period: "week" | "month" | "year"

Response 200: OK
{
  "visitors": 45200,
  "registrations": 1500,
  "transactions": 8500,
  "conversionRate": 18.21,
  "avgOrderValue": 5315294,
  "dailyData": [
    {
      "date": "2024-02-27",
      "visitors": 6200,
      "transactions": 1100,
      "revenue": 3500000
    },
    // ... more days
  ]
}
```

---

## Error Responses

### Standard Error Format
```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Human-readable error message",
    "details": {
      "field": "specific issue details"
    }
  },
  "timestamp": "2024-03-05T10:30:00Z"
}
```

### Common Error Codes
- `UNAUTHORIZED`: No valid token provided
- `FORBIDDEN`: User doesn't have permission
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `SERVER_ERROR`: Internal server error
- `RATE_LIMIT`: Too many requests

---

## Rate Limiting

```
- 100 requests per minute per IP
- 1000 requests per hour per user
- Burst limit: 20 requests per second
```

Headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1709625000
```

---

## Webhooks (Optional)

### Transaction Completed
```
POST /webhook/admin/transaction-completed
```

```json
{
  "event": "transaction.completed",
  "transactionId": "tx-123",
  "status": "successful",
  "amount": 75000,
  "timestamp": "2024-03-05T10:32:15Z"
}
```

---

## Testing Endpoints

### Development Base URL
```
http://localhost:5174/api/admin
```

### Production Base URL
```
https://api.gamepay.com/api/admin
```

### Test Credentials
```
Email: admin@gamepay.com
Password: demo-password-123
Google OAuth: Enable in Google Cloud Console
```

---

**Last Updated:** March 2026  
**API Version:** 1.0.0  
**Specification Version:** 1.0
