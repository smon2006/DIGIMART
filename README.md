# 🛒 DIGIMART — Multi-Vendor E-Commerce Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-digimart--store.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://digimart-store.vercel.app/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

**DIGIMART** is a full-stack MERN multi-vendor e-commerce platform designed to connect buyers, sellers, and platform administrators within a unified ecosystem. It features a customer storefront for browsing and checkout, alongside a management dashboard for vendor store operations and admin governance.

---

## ✨ Key Features

### 🛍️ Customer Storefront (`/frontend`)
* **Dynamic Product Catalog:** Filter, search, and browse products by categories, subcategories, and brands.
* **Cart & Wishlist Systems:** Persistent item selection, dynamic stock validation, quantity updates, and clean empty-state handling.
* **Customer Portal:** Order tracking, purchase history, profile updates, and product reviews.
* **Authentication & Security:** JWT-based user authentication, secure registration, password visibility toggles, and "Forgot Password" recovery flow.

### 📊 Multi-Role Management Dashboard (`/dashboard`)
* **Role-Based Access Control (RBAC):** Customized interfaces and permission gates for **Administrators** and **Sellers**.
* **Seller Portal:**
  * Complete product lifecycle management (CRUD: Create, Read, Update, Delete with stock tracking).
  * Store profile customization and branding controls.
  * Real-time order fulfillment, dispatch status updates, and earnings tracking.
* **Admin Control Panel:**
  * Platform-wide analytics and seller account request approvals.
  * Category, banner, and commission setup.
  * Customer and vendor management.

### ⚡ Backend Services & Automation (`/backend`)
* **RESTful API:** Robust Node.js & Express API routing for users, products, carts, orders, and dashboard analytics.
* **MongoDB Data Models:** Optimized Schemas with Mongoose for Users, Shops, Products, Categories, Orders, and Reviews.
* **Automated Cron Jobs:** Integrated **Render Cron Jobs** for automated server pinging, background cleanup, and scheduled maintenance.

---

## 🛠️ Tech Stack

* **Frontend & Dashboard:** React.js, React Router, JavaScript (ES6+), HTML5, CSS3 / Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose ORM)
* **Background Tasks:** Render Cron Jobs
* **Deployment & Hosting:** Vercel (Storefront & Dashboard), Render (Backend API & Cron Jobs)

---

## 📁 Monorepo Structure

```text
DIGIMART/
├── backend/       # Node.js/Express API server, Mongoose models, cron tasks
├── dashboard/     # React panel for Admin & Vendor management
├── frontend/      # React store for customer browsing & checkout
└── .gitignore     # Git repository exclusion rules
```
---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v16+ recommended)
* [MongoDB](https://www.mongodb.com/) cluster instance or local MongoDB URI

### Local Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/smon2006/DIGIMART.git
   cd DIGIMART
   ```
   
2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create and configure backend/.env file
   npm start
   ```
   
3. **Frontend (Storefront) Setup** *(In a new terminal)*
   ```bash
   cd frontend
   npm install
   # Create and configure frontend/.env file
   npm start
   ```
   
4. **Dashboard Setup** *(In a third terminal)*
   ```bash
   cd dashboard
   npm install
   # Create and configure dashboard/.env file
   npm start
   ```
   
## ⚙️ Environment Configuration

Set up environment variables by creating `.env` files within each respective directory:

### `/backend/.env`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Optional: Cloudinary configuration for image uploads
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### `/frontend/.env` & `/dashboard/.env`
```env
REACT_APP_API_URL=http://localhost:5000
```
