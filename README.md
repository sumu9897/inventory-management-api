# 📦 Inventory Management API

A RESTful API for managing inventory items built with **Node.js** and **Express.js**. Supports full CRUD operations with in-memory data storage and is deployed live on Vercel.

**🌐 Live Base URL:**
```
https://inventory-management-api-sage.vercel.app
```

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Data Model](#-data-model)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- Get all inventory items
- Get a single item by ID
- Create a new inventory item
- Update an existing item by ID
- Delete an item by ID
- Input validation with descriptive error messages
- Global error handling middleware
- CORS enabled for cross-origin requests
- 25 pre-seeded inventory items for immediate use

---

## 🛠 Tech Stack

| Layer       | Technology       |
|-------------|-----------------|
| Runtime     | Node.js          |
| Framework   | Express.js v5    |
| Storage     | In-memory (array)|
| Middleware  | CORS, express.json |
| Deployment  | Vercel           |

> **Note:** Data is stored in-memory. All changes reset on server restart.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sumu9897/inventory-management-api.git

# 2. Navigate into the project
cd inventory-management-api

# 3. Install dependencies
npm install
```

### Running the Server

```bash
# Production
npm start

# Development (with nodemon auto-restart)
npm run dev
```

The server starts on **`http://localhost:4000`**.

> To use `npm run dev`, install nodemon globally or as a dev dependency:
> ```bash
> npm install -D nodemon
> ```

---

## 📡 API Reference

### Base URL

```
https://inventory-management-api-sage.vercel.app
```

All item endpoints are prefixed with `/api/items`.

---

### ✅ Health Check

```http
GET /
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Welcome to the Inventory Management API!"
}
```

---

### 📋 Get All Items

```http
GET /api/items
```

**Response `200 OK`:**
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "category": "Electronics",
      "quantity": 10,
      "price": 750,
      "supplier": "Tech World"
    }
  ]
}
```

---

### 🔍 Get Item by ID

```http
GET /api/items/:id
```

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Laptop",
    "category": "Electronics",
    "quantity": 10,
    "price": 750,
    "supplier": "Tech World"
  }
}
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Item not found"
}
```

---

### ➕ Create an Item

```http
POST /api/items
Content-Type: application/json
```

**Request Body** *(all fields required)*:
```json
{
  "name": "Wireless Mouse",
  "category": "Accessories",
  "quantity": 50,
  "price": 20,
  "supplier": "Gadget Hub"
}
```

**Response `201 Created`:**
```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "id": 26,
    "name": "Wireless Mouse",
    "category": "Accessories",
    "quantity": 50,
    "price": 20,
    "supplier": "Gadget Hub"
  }
}
```

---

### ✏️ Update an Item

```http
PUT /api/items/:id
Content-Type: application/json
```

**Request Body** *(all fields required)*:
```json
{
  "name": "Wireless Mouse Pro",
  "category": "Accessories",
  "quantity": 75,
  "price": 35,
  "supplier": "Gadget Hub"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Item updated successfully",
  "data": {
    "id": 26,
    "name": "Wireless Mouse Pro",
    "category": "Accessories",
    "quantity": 75,
    "price": 35,
    "supplier": "Gadget Hub"
  }
}
```

---

### 🗑️ Delete an Item

```http
DELETE /api/items/:id
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Item deleted successfully",
  "data": {
    "id": 26,
    "name": "Wireless Mouse Pro",
    "category": "Accessories",
    "quantity": 75,
    "price": 35,
    "supplier": "Gadget Hub"
  }
}
```

---

### ⚠️ Error Responses

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

| Status Code | Meaning                                          |
|-------------|--------------------------------------------------|
| `400`       | Bad Request — missing fields or invalid types    |
| `404`       | Not Found — item ID doesn't exist or unknown route |
| `500`       | Internal Server Error                            |

---

### Validation Rules

All `POST` and `PUT` requests enforce the following:

- `name`, `category`, `supplier` — required strings
- `quantity`, `price` — required numbers, must be **≥ 0**
- All five fields must be present; partial updates are not supported

---

## 🗂 Data Model

| Field      | Type   | Required | Constraints          |
|------------|--------|----------|----------------------|
| `id`       | Number | Auto     | Auto-incremented     |
| `name`     | String | ✅       | Non-empty string     |
| `category` | String | ✅       | Non-empty string     |
| `quantity` | Number | ✅       | Integer, min: 0      |
| `price`    | Number | ✅       | Float/Int, min: 0    |
| `supplier` | String | ✅       | Non-empty string     |

---

## 📁 Project Structure

```
inventory-management-api/
├── app.js                      # Express app setup, middleware, routes
├── server.js                   # Entry point — starts server on port 4000
├── routes/
│   └── itemRoutes.js           # All /api/items route definitions
├── controllers/
│   └── itemController.js       # Route handler logic (CRUD operations)
├── modes/
│   └── itemModel.js            # In-memory data model (CRUD methods)
├── data/
│   └── inventoryData.js        # 25 pre-seeded inventory items
├── middlewares/
│   ├── errorHandeler.js        # Global error handler (500 responses)
│   └── notFound.js             # 404 handler for unknown routes
├── package.json
└── package-lock.json
```

---

## ☁️ Deployment

This API is deployed as a serverless application on **Vercel**.

### Deploy your own instance

1. Fork this repository
2. Go to [vercel.com](https://vercel.com) and import the forked repo
3. Vercel auto-detects Node.js — no extra configuration needed
4. Click **Deploy**

Vercel will automatically redeploy on every push to the `main` branch.

---

## 🤝 Contributing

Contributions are welcome!

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: describe your change"

# 4. Push the branch
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 👤 Author

**sumu9897**
- GitHub: [@sumu9897](https://github.com/sumu9897)