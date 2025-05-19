import React, { useState, useEffect } from 'react';
import Column from './components/Column';
import boardData from './data/boardData.json';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  const [board, setBoard] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState({ title: '', description: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '', column: 'To Do' });

  useEffect(() => {
    const savedBoard = localStorage.getItem('boardData');
    try {
      const parsed = JSON.parse(savedBoard);
      if (parsed?.['To Do'] && parsed?.['In Progress'] && parsed?.['Done']) {
        setBoard(parsed);
      } else {
        setBoard(boardData);
        localStorage.setItem('boardData', JSON.stringify(boardData));
      }
    } catch (err) {
      console.error("Invalid board data in localStorage:", err);
      setBoard(boardData);
      localStorage.setItem('boardData', JSON.stringify(boardData));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(board).length > 0) {
      localStorage.setItem('boardData', JSON.stringify(board));
    }
  }, [board]);

  const handleCreateTask = () => {
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
    };

    setBoard(prevBoard => ({
      ...prevBoard,
      [newTask.column]: [...prevBoard[newTask.column], task]
    }));

    setNewTask({ title: '', description: '', column: 'To Do' });
  };

  const handleDeleteTask = (taskId, column) => {
    setBoard(prevBoard => ({
      ...prevBoard,
      [column]: prevBoard[column].filter(task => task.id !== taskId)
    }));
  };

  const handleTaskClick = (task, column) => {
    setSelectedTask({ ...task, column });
    setEditingTask({ title: task.title, description: task.description || '' });
  };

  const handleModalClose = () => setSelectedTask(null);

  const handleSave = () => {
    setBoard(prevBoard => ({
      ...prevBoard,
      [selectedTask.column]: prevBoard[selectedTask.column].map(task =>
        task.id === selectedTask.id
          ? { ...task, title: editingTask.title, description: editingTask.description }
          : task
      )
    }));
    setSelectedTask(null);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const from = source.droppableId;
    const to = destination.droppableId;

    const allowedMoves = {
      'To Do': ['In Progress'],
      'In Progress': ['Done'],
      'Done': []
    };

    if (!allowedMoves[from].includes(to)) return;

    setBoard(prevBoard => {
      const sourceTasks = Array.from(prevBoard[from]);
      const destTasks = Array.from(prevBoard[to]);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedTask);

      return {
        ...prevBoard,
        [from]: sourceTasks,
        [to]: destTasks
      };
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 font-sans p-4 box-border overflow-x-hidden">
      {/* Create Task Form */}
      <div className="bg-white p-4 m-4 rounded-lg shadow-md flex gap-2 items-center justify-center flex-wrap">
        <h3 className="font-semibold">Create New Task</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="p-2 rounded border border-gray-300"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="p-2 rounded border border-gray-300"
        />
        <select
          value={newTask.column}
          onChange={(e) => setNewTask({ ...newTask, column: e.target.value })}
          className="p-2 rounded border border-gray-300"
        >
          {Object.keys(board).map((col) => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
        <button
          onClick={handleCreateTask}
          className="bg-[#170c7a] text-white px-4 py-2 rounded cursor-pointer"
        >
          Add Task
        </button>
      </div>

      {/* Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-between items-start p-5 w-full h-full">
          {Object.entries(board).map(([status, tasks]) => (
            <Column
              key={status}
              columnId={status}
              title={status}
              tasks={tasks}
              onTaskClick={(task) => handleTaskClick(task, status)}
              onDeleteTask={(taskId) => handleDeleteTask(taskId, status)}
            />
          ))}
        </div>
      </DragDropContext>


      {/* Modal */}
      {selectedTask && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 w-[300px] rounded-lg flex flex-col">
            <h3 className="font-semibold mb-2">Edit Task</h3>
            <input
              type="text"
              value={editingTask.title}
              onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
              className="mb-3 p-2 rounded border border-gray-300"
              placeholder="Task title"
            />
            <textarea
              value={editingTask.description}
              onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
              className="mb-3 p-2 rounded border border-gray-300"
              placeholder="Optional description"
            />
            <button
              onClick={handleSave}
              className="p-2 rounded bg-[#170c7a] text-white cursor-pointer hover:opacity-90"
            >
              Save
            </button>
            <button
              onClick={handleModalClose}
              className="p-2 mt-2 rounded bg-gray-300 text-black cursor-pointer hover:opacity-90"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;





// import React, { useState, useEffect } from 'react';
// import Column from './components/Column';
// import boardData from './data/boardData.json';
// import { DragDropContext } from 'react-beautiful-dnd';

// function App() {
//   const [board, setBoard] = useState({});
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [editingTask, setEditingTask] = useState({ title: '', description: '' });
//   const [newTask, setNewTask] = useState({ title: '', description: '', column: 'To Do' });

//   useEffect(() => {
//     const savedBoard = localStorage.getItem('boardData');
//     try {
//       const parsed = JSON.parse(savedBoard);
//       if (parsed?.['To Do'] && parsed?.['In Progress'] && parsed?.['Done']) {
//         setBoard(parsed);
//       } else {
//         setBoard(boardData);
//         localStorage.setItem('boardData', JSON.stringify(boardData));
//       }
//     } catch (err) {
//       console.error("Invalid board data in localStorage:", err);
//       setBoard(boardData);
//       localStorage.setItem('boardData', JSON.stringify(boardData));
//     }
//   }, []);

//   useEffect(() => {
//     if (Object.keys(board).length > 0) {
//       localStorage.setItem('boardData', JSON.stringify(board));
//     }
//   }, [board]);

//   const handleCreateTask = () => {
//     if (!newTask.title.trim()) return;

//     const task = {
//       id: Date.now().toString(),
//       title: newTask.title,
//       description: newTask.description,
//     };

//     setBoard(prevBoard => ({
//       ...prevBoard,
//       [newTask.column]: [...prevBoard[newTask.column], task]
//     }));

//     setNewTask({ title: '', description: '', column: 'To Do' });
//   };

//   const handleDeleteTask = (taskId, column) => {
//     setBoard(prevBoard => ({
//       ...prevBoard,
//       [column]: prevBoard[column].filter(task => task.id !== taskId)
//     }));
//   };

//   const handleTaskClick = (task, column) => {
//     setSelectedTask({ ...task, column });
//     setEditingTask({ title: task.title, description: task.description || '' });
//   };

//   const handleModalClose = () => setSelectedTask(null);

//   const handleSave = () => {
//     setBoard(prevBoard => ({
//       ...prevBoard,
//       [selectedTask.column]: prevBoard[selectedTask.column].map(task =>
//         task.id === selectedTask.id
//           ? { ...task, title: editingTask.title, description: editingTask.description }
//           : task
//       )
//     }));
//     setSelectedTask(null);
//   };

//   const onDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const from = source.droppableId;
//     const to = destination.droppableId;

//     const allowedMoves = {
//       'To Do': ['In Progress'],
//       'In Progress': ['Done'],
//       'Done': []
//     };

//     if (!allowedMoves[from].includes(to)) return;

//     setBoard(prevBoard => {
//       const sourceTasks = Array.from(prevBoard[from]);
//       const destTasks = Array.from(prevBoard[to]);
//       const [movedTask] = sourceTasks.splice(source.index, 1);
//       destTasks.splice(destination.index, 0, movedTask);

//       return {
//         ...prevBoard,
//         [from]: sourceTasks,
//         [to]: destTasks
//       };
//     });
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-100 font-sans p-4 box-border overflow-x-hidden">
//       {/* Create Task Form */}
//       <div className="bg-white p-4 m-4 rounded-lg shadow-md flex gap-2 items-center justify-center flex-wrap">
//         <h3 className="font-semibold">Create New Task</h3>
//         <input
//           type="text"
//           placeholder="Task Title"
//           value={newTask.title}
//           onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//           className="p-2 rounded border border-gray-300"
//         />
//         <input
//           type="text"
//           placeholder="Description (optional)"
//           value={newTask.description}
//           onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//           className="p-2 rounded border border-gray-300"
//         />
//         <select
//           value={newTask.column}
//           onChange={(e) => setNewTask({ ...newTask, column: e.target.value })}
//           className="p-2 rounded border border-gray-300"
//         >
//           {Object.keys(board).map((col) => (
//             <option key={col} value={col}>{col}</option>
//           ))}
//         </select>
//         <button
//           onClick={handleCreateTask}
//           className="bg-[#170c7a] text-white px-4 py-2 rounded cursor-pointer"
//         >
//           Add Task
//         </button>
//       </div>

//       {/* Board */}
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="flex justify-between items-start p-5 w-full h-full flex-wrap">
//           {Object.entries(board).map(([status, tasks]) => (
//             <Column
//               key={status}
//               columnId={status}
//               title={status}
//               tasks={tasks}
//               onTaskClick={(task) => handleTaskClick(task, status)}
//               onDeleteTask={(taskId) => handleDeleteTask(taskId, status)}
//             />
//           ))}
//         </div>
//       </DragDropContext>

//       {/* Modal */}
//       {selectedTask && (
//         <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-4 w-[300px] rounded-lg flex flex-col">
//             <h3 className="font-semibold mb-2">Edit Task</h3>
//             <input
//               type="text"
//               value={editingTask.title}
//               onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
//               className="mb-3 p-2 rounded border border-gray-300"
//               placeholder="Task title"
//             />
//             <textarea
//               value={editingTask.description}
//               onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
//               className="mb-3 p-2 rounded border border-gray-300"
//               placeholder="Optional description"
//             />
//             <button
//               onClick={handleSave}
//               className="p-2 rounded bg-[#170c7a] text-white cursor-pointer hover:opacity-90"
//             >
//               Save
//             </button>
//             <button
//               onClick={handleModalClose}
//               className="p-2 mt-2 rounded bg-gray-300 text-black cursor-pointer hover:opacity-90"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
