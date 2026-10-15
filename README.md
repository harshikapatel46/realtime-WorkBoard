<div align="center">

# 🎨 RealTime Workboard

**A full-stack collaborative whiteboard where multiple users draw, edit, and share boards in real time.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

---

## 📖 Overview

**RealTime Workboard** is an interactive, multi-user whiteboard built on the MERN stack. Users can sign up, create boards, invite others to join, and draw together on a shared canvas with every stroke synced instantly across all connected clients via **Socket.IO**. Boards can be saved and reloaded later, so no work is lost.


## ✨ Features

### 🔐 Authentication
- Secure user registration and login
- JWT-based authentication with hashed passwords (bcrypt.js)
- Protected routes for authenticated users only

### 🤝 Real-Time Collaboration
- Live drawing synchronization across all connected clients
- Multiple users working on the same board simultaneously
- Shared collaborative workspace with instant updates

### 🗂️ Board Management
- Create new whiteboards
- Join existing boards
- Save whiteboard sessions
- Load previous sessions and continue where you left off

### 🖌️ Interactive Canvas
- Smooth, performant canvas rendering powered by React Konva
- Multiple drawing tools

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React.js, Vite, Tailwind CSS, React Router DOM, React Konva |
| **Backend** | Node.js, Express.js, Socket.IO |
| **Auth & Security** | JWT, bcrypt.js |
| **Database** | MongoDB, Mongoose |

## 🏗️ How It Works

```
┌──────────────┐   HTTP (REST + JWT)   ┌──────────────┐        ┌───────────┐
│   React app  │ ────────────────────▶ │ Express API  │ ─────▶ │  MongoDB  │
│  (Konva UI)  │                       │              │        │ (Mongoose)│
│              │ ◀──── Socket.IO ────▶ │  Socket.IO   │        └───────────┘
└──────────────┘   real-time events    └──────────────┘
```

1. Users authenticate through the REST API and receive a JWT.
2. Joining a board opens a Socket.IO connection scoped to that board.
3. Drawing events are broadcast to every other client on the same board.
4. Saved sessions are persisted to MongoDB and can be reloaded anytime.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/harshikapatel46/realtime-WorkBoard.git
cd realtime-WorkBoard
```

### 2. Install dependencies

**Frontend**

```bash
cd client
npm install
```

**Backend**

```bash
cd server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server/` directory (adjust names to match your code):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```



### 4. Run the application

Open two terminals:

**Backend**

```bash
cd server
npm run dev
```

**Frontend**

```bash
cd client
npm run dev
```

The frontend will be available at the URL Vite prints in the terminal (usually `http://localhost:5173`).

## 📁 Project Structure

```
realtime-WorkBoard/
├── client/     # React + Vite frontend (React Konva canvas, routing, UI)
└── server/     # Express API, Socket.IO server, MongoDB models
```

## 🧪 Usage

1. **Register** a new account or **log in**.
2. **Create** a new whiteboard, or **join** an existing one.
3. Pick a drawing tool and start drawing — collaborators see your changes live.
4. **Save** your session and **load** it again whenever you want.

## 🗺️ Roadmap

- [ ] Live cursors and user presence indicators
- [ ] Undo / redo history
- [ ] Export boards as PNG / PDF
- [ ] Shareable invite links with permissions
- [ ] Shapes, text, and eraser enhancements

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 👩‍💻 Author

**Harshika Patel** — [@harshikapatel46](https://github.com/harshikapatel46)

---

<div align="center">

⭐ If you found this project useful, consider giving it a star!

</div>
