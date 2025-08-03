import { useEffect, useState } from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [todo, ...prev]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, todo) => {
    setTodos((prev) => prev.map((ptodo) => (ptodo.id === id ? todo : ptodo)));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((ptodo) =>
        ptodo.id === id ? { ...ptodo, completed: !ptodo.completed } : ptodo
      )
    );
  };

  useEffect(() => {
    const ptodo = JSON.parse(localStorage.getItem("todos"));
    if (ptodo && ptodo.length) setTodos(ptodo);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, toggleComplete, editTodo }}
    >
      <div className="min-h-screen bg-[#0f172a] py-10 px-4 text-white">
        <div className="max-w-2xl mx-auto bg-[#1e293b] rounded-xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-center text-[#22d3ee] mb-8">
            Manage Your Todos 🌒
          </h1>
          <TodoForm />
          <div className="mt-6 flex flex-col gap-3">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
