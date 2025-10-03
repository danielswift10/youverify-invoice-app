# Invoice App

A simple, responsive invoicing application built with **React**, implementing user authentication, invoice management, and mock backend APIs. The project follows best practices for clean, modular, and testable code.

---

## 🚀 Features

* **User Authentication**: Signup/Login using Firebase Authentication.
* **Invoices Management**: Create and view invoices.
* **Mock Backend APIs**: Implemented using `msw` (Mock Service Worker).
* **Error Handling**: Covers invalid URLs, network issues, and common app errors.
* **Responsive Design**: Works seamlessly on both desktop and mobile.
* **Feedback States**: Loading spinners, skeletons and UI messages for async operations.

---

## 🛠️ Tech Stack

* **Frontend Framework**: React + TypeScript
* **Styling**: TailwindCSS
* **Authentication**: Firebase Auth
* **Mock Backend**: MSW (Mock Service Worker)
* **Build Tool**: Vite

---

## 📂 Project Structure

```
invoice-app/
├── public/
│   ├── mockServiceWorker.js   # MSW script
│   └── vite.svg               # Vite logo
│
├── src/
│   ├── assets/                # Images, icons
│   ├── components/            # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── mocks/                 # Mock API handlers (MSW)
│   ├── pages/                 # App pages (Sign In, Sign Up, Dashboard, Invoice, etc.)
│   ├── providers/             # React Query providers
│   ├── services/              # API services
│   ├── store/                 # State management (Nanostores)
│   ├── utils/                 # Utility/helper functions
│   ├── App.tsx                # Root App component
│   ├── index.css              # Global styles
│   └── main.tsx               # Entry point
│
├── .env                       # Environment variables
├── .gitignore
├── eslint.config.js
├── index.html                 # HTML template
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/danielswift10/youverify-invoice-app.git
cd youverify-invoice-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory with:

```
VITE_API_KEY=AIzaSyCKjTGsfvYu3wF5HWafPFSRMDK-_AsRoT8
VITE_AUTH_DOMAIN=youverify-auth.firebaseapp.com
VITE_PROJECT_ID=youverify-auth
VITE_STORAGE_BUCKET=youverify-auth.firebasestorage.app
VITE_MESSAGING_SENDER_ID=484986696625
VITE_APP_ID=1:484986696625:web:0c4359133503b6f0e1c390
VITE_MEASUREMENT_ID=G-EBGRGSX6MR
```

### 4. Run the app

```bash
npm run dev
```

App runs on `http://localhost:5173/`


---

## 📖 Usage

1. **Sign up / Login** with Firebase Authentication.
2. **Create an Invoice** by filling in client details, item details, and totals.
3. **View Invoices** on the dashboard.
4. **Realtime Updates**: Open two tabs to see invoice updates via sockets.
5. **Error Handling**: Invalid routes show a custom error page.


---

## 📸 Screenshots

### Dashboard (Invoice Overview)

![Invoice Dashboard Sign Up](public/screenshots/youverify-invoice-sign-up.png)
![Invoice Dashboard Sign In](public/screenshots/youverify-invoice-sign-in.png)
![Invoice Dashboard](public/screenshots/youverify-invoice-dashboard.png)

---

## 📌 Assumptions

* Firebase is used for auth but can be swapped.
* Mock backend replaces a real API for this demo.
* Invoice statuses (PAID, DRAFT, OVERDUE) are predefined.

---

## 👨🏽‍💻 Author

**Daniel Ojeyomi**

* GitHub: [@danielswift10](https://github.com/danielswift10)

---

## 📜 License

MIT License
