# 💰 Personal Finance Tracker

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-16a34a?style=for-the-badge)](https://www.mongodb.com/mern-stack)
[![React](https://img.shields.io/badge/Frontend-React-0ea5e9?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-15803d?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-166534?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT Auth](https://img.shields.io/badge/Auth-JWT-f97316?style=for-the-badge)](https://jwt.io/)

## 🔗 Live Repository

GitHub: [https://github.com/sanjay210407/finance-tracker](https://github.com/sanjay210407/finance-tracker)

A full-stack Personal Finance Tracker application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) featuring JWT-based authentication, real-time financial analytics, and dynamic data visualization.

---

## 🚀 Features

✅ **User Authentication** - Secure JWT-based login and registration  
✅ **Transaction Management** - Add, edit, and delete income/expense transactions  
✅ **Financial Analytics** - Real-time balance, income, and expense calculations  
✅ **Data Visualization** - Interactive Recharts for pie charts and line graphs  
✅ **Monthly Trends** - Track spending patterns over time  
✅ **Export Reports** - Download financial reports as PDF  
✅ **Responsive Design** - Mobile-friendly modern UI with custom CSS and polished interactions  
✅ **Secure Backend** - Protected API routes with authentication middleware  

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library with hooks
- **Recharts** - Data visualization library
- **Axios** - HTTP client for API requests
- **React Router** - Client-side navigation
- **CSS3** - Modern styling with gradients and animations
- **jsPDF** - PDF generation for reports

### Backend
- **Node.js & Express.js** - RESTful API server
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Tokens for authentication
- **Mongoose** - MongoDB object modeling

---

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud instance)
- Git

### Clone the Repository
```bash
git clone https://github.com/sanjay210407/finance-tracker.git
cd finance-tracker
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

---

## 🎯 Usage

1. **Register** - Create a new account with email and password
2. **Login** - Access your dashboard with credentials
3. **Add Transactions** - Log income and expense entries
4. **View Analytics** - Check balance, income/expense pie chart
5. **Track Trends** - Monitor monthly spending patterns
6. **Download Report** - Export financial summary as PDF
7. **Logout** - Securely end your session

---

## 📁 Project Structure

```
finance-tracker/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── transactionRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── PrivateRoute.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── CSS files
│   ├── public/
│   └── package.json
└── README.md
```

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with credentials

### Transactions
- `GET /api/transactions` - Fetch all transactions
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction
- `GET /api/transactions/monthly` - Get monthly aggregated data

---

## 🎨 UI/UX Highlights

- **Modern Design** - Gradient backgrounds, smooth animations, and glassmorphism effects
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Charts** - Real-time data visualization with Recharts
- **Accessible Forms** - Clean, intuitive input fields with proper validation
- **Focus States** - Keyboard navigation and accessible button interactions
- **Professional Footer** - Project info and contact details

---

## 📊 Key Dependencies

```json
{
  "frontend": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "recharts": "^2.x",
    "jspdf": "^2.x"
  },
  "backend": {
    "express": "^4.x",
    "mongoose": "^7.x",
    "jsonwebtoken": "^9.x",
    "bcryptjs": "^2.x"
  }
}
```

---

## 🚀 Future Enhancements

- 📱 Mobile app with React Native
- 📊 Advanced analytics and reports
- 💳 Multi-currency support
- 🎯 Budget planning and alerts
- 📤 Cloud backup and sync
- 🌙 Dark mode theme

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Sanjay Pothulapally**

- 📧 Email: [sanjaypothulapally@gmail.com](mailto:sanjaypothulapally@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/pothulapallysanjay](https://www.linkedin.com/in/pothulapallysanjay/)
- 🐙 GitHub: [github.com/sanjay210407](https://github.com/sanjay210407)

---

## ⭐ Show Your Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!

---

**Made with ❤️ by Sanjay Pothulapally**
