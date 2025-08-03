import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = todo.trim();
    if (!trimmed) return;
    addTodo({
      id: Date.now(),
      msg: trimmed,
      completed: false,
    });
    setTodo("");
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-white/20 rounded-l-lg px-3 outline-none duration-150 bg-[#1e293b] text-white placeholder:text-gray-400 py-2"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white font-semibold transition duration-150"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
