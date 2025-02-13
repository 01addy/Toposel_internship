# 🚀 Toposel Backend

This is an Express.js-based backend for user authentication and management. It allows users to register, log in, and search for users by username or email. The application uses JWT for authentication and MongoDB for data storage.

---

## 📌 Features
- **User Registration** (`POST /api/auth/signup`)  
- **User Login** (`POST /api/auth/login`)  
- **Search User** (`POST /api/auth/search`) *(Protected by JWT)*  

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/01addy/Toposel_internship.git
cd Toposel_internship

### 2️⃣ Install Dependencies
```sh
npm install
### 3️⃣ Configure Environment Variables
Copy .env.example to .env and replace the placeholders:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
PORT=5000
### 4️⃣ Start the Server
npm run dev

