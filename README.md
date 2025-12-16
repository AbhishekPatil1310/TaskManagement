# 📝 Task Management Application (Full-Stack)

A production-ready, full-stack **Task Management Application** built with modern TypeScript tooling, real-time collaboration, and a clean service-oriented architecture.

This project demonstrates strong fundamentals in **backend design, frontend state management, real-time systems, and data integrity**.

---

## 🚀 Live Demo

* **Frontend**: **
* **Backend API**: **

---

## 🧩 Tech Stack

### Frontend

* **React** (Vite)
* **TypeScript**
* **Tailwind CSS**
* **React Query** (server state & caching)
* **React Hook Form + Zod** (form handling & validation)
* **Socket.io Client** (real-time updates)

### Backend

* **Node.js**
* **Express.js (TypeScript)**
* **Prisma ORM**
* **PostgreSQL (Supabase)**
* **Socket.io** (real-time collaboration)
* **JWT Authentication (HttpOnly cookies)**

### Testing

* **Jest** (unit tests for backend business logic)

---

## 🎯 Objective

Design and build a **complete, production-ready task management system** that supports:

* Secure authentication
* Full task lifecycle management
* Real-time updates & notifications
* Strong data integrity
* Clean, scalable architecture

---

## ✅ Core Features

### 1️⃣ Authentication & Authorization

* Secure user registration and login
* Password hashing using **bcrypt**
* JWT-based session handling via **HttpOnly cookies**
* Protected routes (frontend + backend)
* User profile view & update

---

### 2️⃣ Task Management (CRUD)

Each task includes:

* `title` (max 100 chars)
* `description`
* `dueDate`
* `priority` (Low, Medium, High, Urgent)
* `status` (To Do, In Progress, Review, Completed)
* `creatorId`
* `assignedToId`

Supported operations:

* Create task
* Update task
* Delete task
* View task details
* Assign tasks to other users

---

### 3️⃣ Real-Time Collaboration (Socket.io)

* 🔄 **Live task updates** (status, priority, assignee)
* 🔔 **Instant assignment notifications**
* 📡 Socket rooms based on `userId`
* Real-time UI refresh without page reload

---

### 4️⃣ Dashboard & Data Exploration

Personalized dashboard views:

* Tasks **assigned** to the user
* Tasks **created** by the user
* **Overdue tasks** (based on due date)

Advanced controls:

* Filter by **status**
* Filter by **priority**
* Sort by **due date** (ascending / descending)

---

## 🏗️ Architecture & Design

### Backend Architecture

```
Controller → Service → Repository → Prisma → Database
```

* **Controllers**: Handle HTTP & validation
* **Services**: Business logic & authorization
* **Repositories**: Database access only
* **DTOs**: Zod schemas for input validation
* **Consistent error handling** (401, 403, 404, 400)

---

### Frontend Architecture

```
Pages → Hooks → API Clients → Backend
```

* React Query for server state
* No duplicated global state
* Reusable hooks (`useTasks`, `useAuth`, `useNotifications`)
* Skeleton loaders for better UX

---

## 🗄️ Database Choice Justification

### ❓ Why PostgreSQL instead of MongoDB?

PostgreSQL was chosen deliberately based on **data consistency, relational integrity, and query requirements**.

#### Key Reasons:

### 1️⃣ Strong Relational Data Model

This application has **highly relational data**:

* Users ↔ Tasks (creator & assignee)
* Users ↔ Notifications
* Tasks ↔ Status / Priority enums

PostgreSQL enforces:

* Foreign key constraints
* Referential integrity
* Transaction safety

MongoDB does not enforce relations at the database level, increasing the risk of orphaned or inconsistent data.

---

### 2️⃣ Complex Filtering & Sorting

The dashboard requires:

* Filtering by status & priority
* Sorting by due date
* Overdue task detection

PostgreSQL excels at:

* Indexed queries
* Date comparisons
* Complex `WHERE` clauses
* Efficient sorting at scale

These operations are more predictable and performant in a relational database.

---

### 3️⃣ Prisma ORM Synergy

Prisma is **first-class with PostgreSQL**:

* Strong TypeScript typings
* Schema-driven migrations
* Enum support
* Safer queries at compile time

While Prisma supports MongoDB, advanced relational modeling is significantly more mature with PostgreSQL.

---

### 4️⃣ ACID Compliance

Task updates and notifications must be **reliable and atomic**:

* Task update
* Notification creation
* Real-time emission

PostgreSQL’s ACID guarantees ensure consistency even under concurrent updates.

---

### ✅ Summary

PostgreSQL was chosen because this application:

* Is **relationship-heavy**
* Requires **strong consistency**
* Benefits from **structured queries**
* Needs **production-grade reliability**

---

## 🧪 Testing

Implemented **Jest unit tests** for critical backend logic:

* Task creation validation
* Authorization rules
* Notification triggering logic

Tests are fast, isolated, and deterministic.

---

## 🔐 Security Considerations

* Passwords hashed using bcrypt
* JWT stored in HttpOnly cookies
* Authorization enforced at service layer
* User-scoped socket rooms
* No sensitive data exposed to client

---

## 📦 Installation & Setup

### Backend

```bash/powerShell
cd backend
npm install
npm run dev
```

### Frontend

```bash/powerShell
cd frontend
npm install
npm run dev
```

### Environment Variables

Create `.env` files for backend and frontend as required.

---

## 📌 Future Improvements

* Pagination for large task lists
* Role-based access control
* Email notifications
* Audit logs for task changes

---

## 👨‍💻 Author

**[Abhishek]**
Full-Stack Developer
Built with a focus on **correctness, scalability, and real-world engineering practices**.
