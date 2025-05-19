import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const Column = ({ columnId, title, tasks, onTaskClick, onDeleteTask }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 border-2 border-indigo-600 m-2 flex flex-col min-w-[280px]">
      <h2 className="text-xl font-semibold mb-3 text-indigo-700">{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            className={`p-3 rounded-lg min-h-[200px] transition-colors flex-grow ${
              snapshot.isDraggingOver ? 'bg-indigo-50' : 'bg-gray-100'
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onClick={() => onTaskClick(task, columnId)}
                onDelete={() => onDeleteTask(task.id, columnId)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;





// import React from 'react';
// import { Droppable } from 'react-beautiful-dnd';
// import TaskCard from './TaskCard'; // make sure path is correct

// const Column = ({ columnId, title, tasks, onTaskClick, onDeleteTask }) => {
//   return (
//     <div className="w-full sm:w-1/3 px-2 mb-4">  {/* Added width and padding */}
//       <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col">
//         <h2 className="text-xl font-semibold mb-3">{title}</h2>
//         <Droppable droppableId={columnId}>
//           {(provided, snapshot) => (
//             <div
//               className={`p-3 rounded-lg min-h-[200px] flex-grow transition-colors ${
//                 snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-gray-100'
//               }`}
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//             >
//               {tasks.map((task, index) => (
//                 <TaskCard
//                   key={task.id}
//                   task={task}
//                   index={index}
//                   onClick={() => onTaskClick(task, columnId)}
//                   onDelete={() => onDeleteTask(task.id, columnId)}
//                 />
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </div>
//     </div>
//   );
// };

// export default Column;
