# 🚀 Appathon 2026 Platform  
### TEXPERIA 2K26 | SNS College of Technology

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb)
![Tailwind](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)

A **full-stack real-time event management and judging platform** built for **APPATHON 2026** under **TEXPERIA 2K26** at **SNS College of Technology**.

The platform manages the **entire lifecycle of a hackathon**, from team login and problem statement reveal to project submission, judging, and a cinematic winner reveal experience.

---

# 🌐 Live Demo

| Platform | Link |
|--------|------|
| 🎨 Frontend | https://appathon-frontend.vercel.app |
| ⚙️ Backend API | https://appathon-backend.vercel.app |

---

# 🛠️ Tech Stack

## Frontend
- React.js (Vite)
- React Router DOM
- Tailwind CSS
- Framer Motion
- Canvas Confetti
- Lucide React Icons
- Axios

**Deployment:** Vercel

---

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Cors
- Dotenv

**Deployment:** Vercel Serverless Functions

---

# ✨ Platform Features

## 👨‍💻 Participant Dashboard

A dedicated dashboard designed for teams participating in the event.

**Core Capabilities**

- 🔒 **Problem Statement Locking**  
  Teams review and permanently lock their chosen problem statement.

- ⚡ **Real-Time Event Control**  
  Problem statements remain hidden until the admin triggers the reveal.

- 📤 **Project Submission Portal**  
  Teams submit:
  - GitHub Repository
  - Live Deployment Link

- 🔔 **Live Notifications**
  - Round 1 evaluation completion
  - Final round evaluation alerts

- 📡 **Event Resources**
  - Wi-Fi credentials
  - Technical support contacts

---

## 🛡️ Admin Command Center

A powerful control panel designed for event organizers.

**Key Controls**

- 🎛️ **Global Event Toggles**
  - Reveal problem statements
  - Enable project submissions
  - Lock evaluation marks
  - Trigger winner reveal

- 🧮 **Live Scoring Engine**
  - Round 1 Marks: **/30**
  - Final Round Marks: **/70**
  - Automatic final score calculation

- 📢 **Team Notification System**
  Notify teams instantly when their evaluation is completed.

- 📊 **CSV Export**
  Export a complete spreadsheet including:
  - Team details
  - Contacts
  - GitHub & deployment links
  - Final scores

- ⚠️ **Database Reset (Danger Zone)**
  Clear all testing data before the live event.

---

# 🏆 Cinematic Winner Reveal

A **custom animated winner announcement system** designed to create suspense during the final event moment.

**Experience Includes**

- 🎭 Click-to-reveal podium drops  
- 🥉 Bronze – 3rd Place  
- 🥈 Silver – 2nd Place  
- 🥇 Gold – 1st Place  

Additional effects:

- 🎉 Physics-based confetti animations  
- ✨ Glassmorphism UI  
- ⚡ Real-time score fetching  
- 🎬 Smooth animations powered by Framer Motion

---

# 🧱 System Architecture

```
Frontend (React + Vite)
        │
        │ REST API (Axios)
        ▼
Backend (Node.js + Express)
        │
        ▼
MongoDB Database
```

---

# 👨‍💻 Developer

**Priyadharshan**  
Department of Computer Science and Engineering  
SNS College of Technology  

> *“The Future is Engineered.”*
