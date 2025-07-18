import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    const res = await axios.get("/todos");
    setTodos(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`/todos/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("/todos", form);
    }

    setForm({ title: "", description: "" });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/todos/${id}`);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setForm({ title: todo.title, description: todo.description });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ title: "", description: "" });
  };

  const handleMarkCompleted = async (id) => {
    await axios.put(`/todos/${id}`, { status: 'completed' });
    fetchTodos();
  };

  const handleLogout = async () => {
    await axios.post("/auth/logout");
    document.cookie = "token=; Max-Age=0";
    navigate("/login");
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
          <h1 className="text-3xl font-extrabold text-white">My Todos</h1>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-600 bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-600 bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md w-full transition duration-300 ease-in-out"
            >
              {editId ? "Update Todo" : "Add Todo"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-md w-full transition duration-300 ease-in-out"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <ul className="mt-6 space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className={`bg-gray-700 p-4 rounded-md flex justify-between items-center shadow-sm ${todo.status === 'completed' ? 'opacity-70 line-through' : ''}`}
            >
              <div>
                <h2 className="font-semibold text-lg text-white">{todo.title}</h2>
                <p className="text-sm text-gray-300">{todo.description}</p>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${todo.status === 'completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                  {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
                </span>
              </div>
              <div className="flex gap-2">
                {todo.status === 'pending' && (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition duration-300 ease-in-out"
                    onClick={() => handleMarkCompleted(todo._id)}
                  >
                    Complete
                  </button>
                )}
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition duration-300 ease-in-out"
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition duration-300 ease-in-out"
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoPage;