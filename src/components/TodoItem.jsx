import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoItem({ todo }) {
  const { deleteTodo, editTodo, toggleComplete } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.msg);

  const updateTodo = () => {
    const trimmed = todoMsg.trim();
    if (!trimmed) return;
    editTodo(todo.id, { ...todo, msg: trimmed });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex border border-white/10 rounded-lg px-3 py-2 gap-x-3 shadow-md duration-300 ${
        todo.completed ? "bg-[#334155]/70" : "bg-[#1e293b]/80"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer accent-green-500"
        checked={todo.completed}
        disabled={isTodoEditable}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`w-full bg-transparent text-white outline-none rounded-lg ${
          isTodoEditable
            ? "border border-white/20 px-2 py-0.5"
            : "border border-transparent"
        } ${todo.completed ? "line-through opacity-70" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-white/10 justify-center items-center bg-gray-700 hover:bg-gray-600 text-white shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            updateTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-white/10 justify-center items-center bg-red-700 hover:bg-red-600 text-white shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
