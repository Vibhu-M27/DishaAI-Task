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
a. Go to frontend folder: 
    cd my-react-app
b. Install dependencies: 
    npm install
c. Test locally: 
    npm run dev
d. Deploy to Vercel: Go to Vercel-> connect git repo-> set root dir to my-react-app/-> set build command (npm run build)-> set output dir (dist)-> deploy
e. Backend: Optional Self-Host (not deployed to Vercel)
    cd my-backend
    npm install
    node server.js
f. Backend runs on: http://localhost:5000 and reads/writes task data from: my-react-app/src/data/boardData.json

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

## Chat of AI help: 

https://claude.ai/share/88f7469e-2458-40c5-84d9-ac76ee552ace
https://chatgpt.com/share/682b691e-ec7c-8000-b221-667f0400326d

