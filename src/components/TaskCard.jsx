// import { Draggable } from 'react-beautiful-dnd';

// const TaskCard = ({ task, index, onClick, onDelete }) => (
//   <Draggable draggableId={task.id.toString()} index={index}>
//     {(provided) => (
//       <div
//         className="bg-gradient-to-br from-indigo-700 to-indigo-900 text-white p-4 rounded-lg shadow-md mb-3 cursor-default"
//         ref={provided.innerRef}
//         {...provided.draggableProps}
//         {...provided.dragHandleProps}
//       >
//         <div className="flex justify-between items-center">
//           {/* Clickable text area */}
//           <div
//             className="flex-1 cursor-pointer select-none"
//             onClick={onClick}
//             role="button"
//             tabIndex={0}
//             onKeyPress={(e) => { if(e.key === 'Enter') onClick(); }}
//           >
//             <h3 className="font-semibold text-base leading-snug truncate">{task.title}</h3>
//             {task.description && (
//               <p className="text-sm text-indigo-300 mt-1 line-clamp-2">
//                 {task.description}
//               </p>
//             )}
//           </div>

//           {/* Delete button */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete();
//             }}
//             title="Delete Task"
//             className="ml-3 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600 transition-colors"
//             aria-label="Delete Task"
//           >
//             <svg
//               className="w-5 h-5 text-white"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//     )}
//   </Draggable>
// );

// export default TaskCard;



import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task, index, onClick, onDelete }) => (
  <Draggable draggableId={task.id.toString()} index={index}>
    {(provided) => (
      <div
        className="bg-indigo-900 text-white p-3 rounded-md shadow mb-2 cursor-pointer"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div className="flex justify-between items-center" onClick={onClick}>
          <div>
            <strong className="text-sm">{task.title}</strong>
            {task.description && <p className="text-sm mt-1">{task.description}</p>}
          </div>
          <button
            className="ml-2 text-white text-lg hover:text-red-300"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering onClick
              onDelete();
            }}
            title="Delete Task"
          >
            🗑
          </button>
        </div>
      </div>
    )}
  </Draggable>
);

export default TaskCard;




