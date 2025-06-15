# 🍔 FoodSpot - Online Food Ordering Platform

## 🌟 Features

### 👨‍🍳 User Side
- User authentication (JWT)
- Browse food menu
- Add/remove items from cart
- Stripe payment integration
- Order history tracking
- Order status updates

### 🛠️ Admin Panel
- Admin dashboard
- Product management
- Order management
- Status updates
- Responsive design

## 🖥️ Tech Stack
- **Frontend**: React, Axios, React Router
- **Admin**: React, Context API
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Payments**: Stripe
- **Storage**: Cloudinary

## 📂 Project Structure

### Frontend
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

text

### Admin Panel
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

text

### Backend
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

text

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

## 🔒 Admin Access
Add to headers:
```json
{
  "token": "admin_access_token"
}
🚀 Setup
Frontend
bash
git clone https://github.com/codecoolwithahmed/FoodSpot
cd frontend
npm install
npm start
Backend
bash
cd backend
npm install
Create .env:

ini
PORT=4000
MONGO_URL=mongodb_connection_string
JWT_SECRET=your_jwt_secret
🔮 Future Improvements
Email notifications

Password recovery

Advanced search

Analytics dashboard

👨💻 Author
Muhammad Ahmed Ashar
MERN Stack Developer
GitHub