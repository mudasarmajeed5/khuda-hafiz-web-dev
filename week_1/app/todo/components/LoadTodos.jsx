"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { formatDateTime } from "../helpers/formatDate";
const LoadTodos = ({ todos, onDelete, onEdit, onToggle }) => {
  if (todos.length == 0) {
    return <div className="text-center text-2xl animate-pulse font-bold text-[var(--color-primary)]">No Todos, add something</div>
  }
  return (
    <div className="space-y-2">
      {todos?.map((todo) => (
        <div
          key={todo._id}
          className="p-3 border rounded-md shadow-sm flex justify-between items-center bg-white text-sm"
        >
          {/* Left side */}
          <div className="flex flex-col justify-between gap-3">
            <h2 className={`font-medium ${todo.isCompleted ? "line-through text-gray-400" : ""}`}>
              {todo.title}
            </h2>

            <div className="flex justify-between w-full gap-2 mt-1 text-xs">
              {/* Priority badge */}
              <div className="flex gap-2 items-center justify-center">
                <span className={`px-2 py-0.5 rounded-full font-medium
                ${todo.priority === "high" ? "bg-red-100 text-red-700" : todo.priority === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}
              `}>
                  {todo.priority}
                </span>
                <span className="text-gray-400">Created: {formatDateTime(todo.createdAt)}</span>
                <span className="text-gray-400">Updated: {formatDateTime(todo.updatedAt)}</span>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => onToggle(todo._id, !todo.isCompleted)}
                  />
                  Mark as Completed
                </label>

              </div>

            </div>
          </div>

          <div className="flex gap-4 flex-col">
            <div className={`text-xs px-2 py-1 rounded-full 
            ${todo.isCompleted ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
              {todo.isCompleted ? "Completed" : "Pending"}
            </div>
            <div className="flex gap-2 justify-center items-center">
              <button onClick={() => { onDelete(todo._id) }} className="text-red-800 bg-red-400 px-2 py-1 rounded-md cursor-pointer"><MdDelete /></button>
              <button onClick={() => { onEdit(todo._id) }} className="text-green-800 bg-green-400 px-2 py-1 rounded-md cursor-pointer"><MdEdit /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadTodos;
