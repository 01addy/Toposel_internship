#  Node.js Development internship

This is an Express.js-based backend for user authentication and management. It allows users to register, log in, and search for users by username or email. The application uses JWT for authentication and MongoDB for data storage.

---

## Features
- **User Registration** (`POST /api/auth/signup`)  
- **User Login** (`POST /api/auth/login`)  
- **Search User** (`POST /api/auth/search`) *(Protected by JWT)*  

---

## Setup & Installation

### 1️ Clone the Repository
```sh
git clone https://github.com/01addy/Toposel_internship.git
cd Toposel_internship
```

### 2️ Install Dependencies
```sh
npm install
```

### 3️ Configure Environment Variables  
Copy `.env.example` to `.env` and replace the placeholders:
```ini
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
PORT=5000
```

### 4 Start the Server
```sh
npm run dev
```

---

## API Endpoints

### User Registration  
**Endpoint:** `POST /api/auth/signup`  
**Body (JSON):**
```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "securepassword",
  "fullname": "Test User",
  "gender": "Male",
  "dob": "2000-01-01",
  "country": "USA"
}
```

### User Login  
**Endpoint:** `POST /api/auth/login`  
**Body (JSON):**
```json
{
  "email": "testuser@example.com",
  "password": "securepassword"
}
```
**Response (JSON):**
```json
{
  "token": "your_jwt_token",
  "user": {
    "id": "user_id",
    "username": "testuser",
    "email": "testuser@example.com",
    "fullname": "Test User",
    "gender": "Male",
    "dob": "2000-01-01",
    "country": "USA",
    "createdAt": "2025-02-13T12:00:00.000Z"
  }
}
```

### Search User  
**Endpoint:** `POST /api/auth/search`  
**Headers:**  
```
Authorization: Bearer <JWT_TOKEN>
```  
**Body (JSON):**
```json
{
  "query": "testuser" or "testuser@example.com"
}
```
**Response (JSON):**
```json
{
  "id": "user_id",
  "username": "testuser",
  "email": "testuser@example.com",
  "fullname": "Test User",
  "gender": "Male",
  "dob": "2000-01-01",
  "country": "USA",
  "createdAt": "2025-02-13T12:00:00.000Z"
}
```

---

## Folder Structure
```
Toposel_internship/
│-- backend/
│   │-- controllers/
│   │   ├── authController.js
│   │-- middleware/
│   │   ├── authMiddleware.js
│   │-- models/
│   │   ├── User.js
│   │-- routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │-- utils/
│   │   ├── sendEmail.js
│   │-- .env.example
│   │-- .gitignore
│   │-- package.json
│   │-- server.js
```

---

## Notes for Evaluator
- Ensure `.env` file is correctly configured.  
- Use `Postman` to test the APIs.  
- The project is structured for scalability and follows best practices.  

---
## Important Note for Evaluator  
For security reasons, the `MONGO_URI`, `EMAIL_USER`, and `EMAIL_PASS` have not been shared in the repository. However, if necessary for evaluation purposes, I am open to providing these details upon request.

```
