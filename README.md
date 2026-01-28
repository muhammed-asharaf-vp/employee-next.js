# 🏢 Employee Management System (Frontend)

This is a **Next.js (App Router)** frontend application developed as part of a task assignment.  
The application implements **JWT-based authentication** and **Department management** with protected APIs.

---

## 🚀 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios
- JWT Authentication
- Gsap

---

## 🔐 Authentication Flow

- Users can **register** and **login**
- On successful login, backend returns a **JWT token**
- Token is stored in `localStorage`
- Token is automatically attached to all protected API requests using **Axios interceptors**
- On `401 Unauthorized`, user is automatically logged out

### ⚠️ Important Authorization Rule (Task Requirement)

```http
Authorization: <token>
