# 🍔 FoodSpot - Online Food Ordering Platform

FoodSpot is a full-stack MERN application that allows users to browse food items, place orders, and manage them through an admin dashboard. It supports Stripe payments and JWT-based authentication.

---

## 🌍 Live Demos

| Platform     | Link                                                   |
|--------------|--------------------------------------------------------|
| Frontend     | [foodspot-frontend.vercel.app](https://foodspot-frontend.vercel.app) |
| Admin Panel  | [foodspot-admin.vercel.app](https://foodspot-admin.vercel.app)       |
| Backend Repo | [github.com/ahmed-ashar/FoodSpot](https://github.com/ahmed-ashar/FoodSpot/tree/main/backend) |

---

## 🛂 Demo Admin Login

- **Email**: `admin@gmail.com`  
- **Password**: `admin1234`

---

## ✨ Features

### 👨‍🍳 User Side (Frontend)
- 🔐 User Authentication (JWT)
- 🍽️ Browse food products
- 🛒 Add/remove items from cart
- 💳 Stripe Payment Integration
- 📦 Order History and Tracking
- ✅ Order Status (Pending / Delivered / Cancelled)

### 🛠️ Admin Panel
- 🔐 Admin-only login
- ➕ Add/Edit/Delete products
- 📦 View and manage all orders
- 🔁 Change order status
- 🧭 Sidebar for easy navigation
- 📱 Fully responsive

---

## 🧰 Tech Stack

- **Frontend**: React, Axios, React Router, Toastify
- **Admin Panel**: React, Context API, Protected Routes
- **Backend API**: Node.js, Express, MongoDB, JWT, Stripe, Cloudinary
- **Database**: MongoDB with Mongoose
- **Payments**: Stripe
- **Image Uploads**: Cloudinary
- **Hosting**: Vercel (Frontend & Admin), Render (Backend)

---

## 📁 Project Structure

### 🔵 Frontend (User)


```
frontend/
├── src/
│ ├── components/
│ │ ├── Navbar/
│ │ ├── Hero/
│ │ ├── Footer/
│ │ └── FoodCollection/
│ ├── pages/
│ │ ├── Home/
│ │ ├── Login/
│ │ ├── Cart/
│ │ ├── Checkout/
│ │ ├── Order/
│ │ └── Verify/
│ ├── context/
│ │ └── FoodContext.js
│ ├── App.js
│ └── index.js
```


### 🔴 Admin Panel
```
admin/
├── src/
│ ├── components/
│ │ ├── Login/
│ │ └── Sidebar/
│ ├── pages/
│ │ ├── Add/
│ │ ├── List/
│ │ └── Orders/
│ ├── App.jsx
│ └── index.css
```


### 🟢 Backend API
```
backend/
├── config/
│ ├── cloudinary.js
│ └── mongodb.js
├── controllers/
│ ├── cartControllers.js
│ ├── orderControllers.js
│ ├── productControllers.js
│ └── userControllers.js
├── middleware/
│ ├── adminAuth.js
│ ├── auth.js
│ └── multer.js
├── models/
│ ├── productModels.js
│ ├── userModels.js
│ └── orderModel.js
├── routes/
│ ├── cartRoute.js
│ ├── orderRoute.js
│ ├── productRoute.js
│ └── userRoute.js
├── .env
├── server.js
└── README.md
```

## ⚙️ Getting Started

### ✅ Frontend & Admin Panel

```
git clone https://github.com/ahmed-ashar/FoodSpot
cd frontend   # or cd admin for admin panel
npm install
npm start
```

Set your backend URL inside src/App.js:

export const backendUrl = 'https://food-spot-five.vercel.app';
🛠 Backend API Setup

```
git clone https://github.com/ahmed-ashar/FoodSpot
cd backend
npm install
```

Create .env file:

```
PORT=4000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin1234
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start backend server:

```
npm start
```

## 🔌 API Endpoints

### 👤 User
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | User login |
| POST | `/api/users/admin` | Admin login |

### 🍕 Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/product/add` | Add product |
| GET | `/api/product/list` | List products |
| POST | `/api/product/remove` | Remove product |
| GET | `/api/product/single` | Get product |

### 🛒 Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart/add` | Add to cart |
| POST | `/api/cart/get` | Get cart |
| POST | `/api/cart/update` | Update cart |

### 📦 Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/order/place` | Place order |
| POST | `/api/order/stripe` | Stripe payment |
| POST | `/api/order/list` | List orders |
| POST | `/api/order/status` | Update status |

### 🔐 Admin Protected Routes
Add the token in the header for all admin routes:

```
headers: {
  "token": "your_admin_token"
}
```
