# Flowbit Ticketing System 🎟️

A scalable, multi-tenant ticketing system with JWT authentication, role-based access control (RBAC), and support for workflow automation using **n8n**. Built with **Node.js**, **MongoDB**, **React**, **Docker**, and **Webpack Module Federation**.

---

## 📦 Features

- 🔐 JWT Authentication
- 🧑‍💼 Role-Based Access Control (Admin, User)
- 🏢 Multi-Tenant Architecture
- 📥 Ticket Management API
- ⚙️ Workflow Automation with n8n
- 🧩 Microfrontend Architecture (Shell + Remote apps)
- 🐳 Dockerized Environment
- 🔁 Ngrok Tunnel for n8n Webhooks

---

## 🗂️ Project Structure

```
flowbit-ticketing-system/
├── api/                # Node.js + Express backend
│   ├── controllers/    # Auth and ticket controllers
│   ├── middlewares/    # JWT and RBAC middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── server.js       # API entry point
│   ├── seed.js         # Seeder for default users
├── frontend-shell/     # React app (main shell)
├── support-tickets/    # React app (ticket module)
├── docker-compose.yml  # Full stack Docker orchestration
└── n8n/                # Workflow automation
```

---

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose installed
- Node.js and npm (for local development, optional)

### 🐳 Running via Docker

```bash
docker-compose up --build
```

Access services:

- Frontend Shell: [http://localhost:3000](http://localhost:3000)
- Support Tickets MFE: [http://localhost:3001](http://localhost:3001)
- API Server: [http://localhost:5000](http://localhost:5000)
- n8n: [http://localhost:5678](http://localhost:5678)
- Ngrok Tunnel UI: [http://localhost:4040](http://localhost:4040)

---

## 🧪 Seed Data

Run the seeder to populate initial tenants:

```bash
docker-compose exec api node seed.js
```

Predefined Admins:

| Customer ID | Email               | Password  |
|-------------|---------------------|-----------|
| LogisticsCo | admin@logistics.com | admin123  |
| RetailGmbH  | admin@retail.com    | admin123  |

---

## 🔐 Authentication & RBAC

- JWT Tokens used for login sessions
- Middleware to restrict access by `role` (Admin/User)
- Tenants are isolated based on `customerId` field

---

## 🔄 Workflow Automation (n8n)

- n8n is preconfigured with Basic Auth (`admin/admin`)
- Use n8n to automate ticket-related workflows, webhooks, notifications, etc.

---

## 🌍 Environment Variables

Set in `docker-compose.yml` or `.env`:

```env
MONGO_URI=mongodb://mongo:27017/flowbit
JWT_SECRET=supersecretkey
WEBHOOK_SECRET=flowbit-webhook-secret
```

---

## 📦 API Endpoints

### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

### Tickets

```http
GET    /api/tickets
POST   /api/tickets
PATCH  /api/tickets/:id
DELETE /api/tickets/:id
```

---

## 🧪 Testing

```bash
docker-compose exec api npm test
```

Uses **Jest** and **Supertest**.

---

## 📸 Diagram

```
[ React Shell (3000) ] <--Module Federation--> [ Ticket MFE (3001) ]
         |                                            |
         ↓                                            ↓
     [ API Server (5000) ]  <-->  [ MongoDB (27018) ] <--> [ n8n (5678) ]
                                                 ↑
                                             [ Ngrok Tunnel ]
```

---
