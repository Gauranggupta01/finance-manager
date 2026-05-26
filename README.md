# Finance Manager 💰

A full stack Finance Management web application built to manage daily income and expenses with beautiful analytics and reports.

This project helps users keep track of their financial activities in a simple and organized way.

---

# 🚀 Features

- User Registration & Login
- Add Income and Expense Transactions
- Category Based Transaction Management
- Dashboard with Financial Overview
- Reports & Analytics
- Monthly Expense Tracking
- Responsive Modern UI
- Secure Backend APIs
- PostgreSQL Database Integration

---

# 🛠 Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- Recharts
- React Icons

## Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- PostgreSQL

## Deployment
- Frontend: Render
- Backend: Render
- Database: PostgreSQL

---

# 📂 Project Structure

```bash
finance-manager/
│
├── finance-manager-frontend/
│
├── finance-manager-backend/
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/finance-manager.git
```

---

# Frontend Setup

## Move to frontend folder

```bash
cd finance-manager-frontend
```

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

## Move to backend folder

```bash
cd finance-manager-backend
```

## Configure PostgreSQL Database

Update `application.properties`

```properties
spring.datasource.url=YOUR_DATABASE_URL
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

---

## Run Backend

```bash
./mvnw spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

# 📊 Main Modules

## Authentication
- Register User
- Login User

## Transactions
- Add Transaction
- Delete Transaction
- View Transactions

## Dashboard
- Income Summary
- Expense Summary
- Savings Analytics

## Reports
- Monthly Reports
- Category Wise Analytics

---

# 🌐 API Endpoints

## Auth APIs

```bash
POST /api/auth/register
POST /api/auth/login
```

## Transaction APIs

```bash
POST /api/transactions
GET /api/transactions/{username}
DELETE /api/transactions/{id}
```

## Category APIs

```bash
GET /api/categories/{username}
POST /api/categories
```

## Report APIs

```bash
GET /api/reports/{username}
```

---

# 📸 Screenshots

- Login Page
- Dashboard
- Add Transaction
- Reports & Analytics
- Transaction History

(Add screenshots here later)

---

# 🎯 Future Improvements

- JWT Authentication
- Export Reports as PDF
- Dark/Light Theme
- Budget Planning
- AI Based Expense Insights
- Mobile App Version

---

# 👨‍💻 Developed By

**Gaurang Gupta**

B.Tech CSE Student | Full Stack Developer

---

# ⭐ If you like this project

Give this repository a star ⭐
