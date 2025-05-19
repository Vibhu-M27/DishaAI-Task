# DishaAI-Task

Live Link: https://disha-ai-task.vercel.app

A Kanban-style task management application built with **React**, **Tailwind CSS**, **Vite**, and a basic **Express.js** backend. Users can create, edit, delete, and drag tasks between columns — To Do, In Progress, and Done.

## Features

- View tasks organized in columns
- Create new tasks
- Edit existing tasks
- Delete tasks
- Drag & drop tasks across columns (powered by `react-beautiful-dnd`)
- Backend persistence with file-based JSON storage

---

## Project Structure

DishaAI-Task/
├── my-react-app/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── components/
│ │ └── data/boardData.json # Stores tasks
│ ├── public/
│ ├── tailwind.config.js
│ ├── postcss.config.cjs
│ └── vite.config.js
└── my-backend/ # Backend (Node + Express)
└── server.js


---

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/Vibhu-M27/DishaAI-Task.git
cd DishaAI-Task

### 2. Setup Frontend (React)

cd my-react-app
npm install          # Install dependencies
npm run dev          # Start development server (usually at http://localhost:5173)

### 3. Setup Backend 

cd my-backend
npm install
node server.js

The server will run at: http://localhost:5000
It reads and writes to: my-react-app/src/data/boardData.json

## Deployment

Frontend: Deployed on Vercel
a. Ensured autoprefixer is installed
b. Ensured a valid build script in my-react-app/package.json
Backend: Optional Self-Host (not deployed to Vercel)

## Tech Stack

Frontend: React + Tailwind CSS + Vite
Backend: Node.js + Express
Drag & Drop: react-beautiful-dnd
Persistence: JSON file system

## Extra points

Tasks are persisted in my-react-app/src/data/boardData.json
API Endpoints:
GET /board - fetch task board data
POST /board - save updated board data



