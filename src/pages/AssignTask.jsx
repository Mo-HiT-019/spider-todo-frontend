import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const AssignTaskPage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", assignedTo: "" });
  const [myAssignedTasks, setMyAssignedTasks] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("/todos/users"); 
    setUsers(res.data);
  };


  const fetchMyAssignedTasks = async () => {
    const res = await axios.get("/todos/assigned-by-me");
    setMyAssignedTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/todos/assign", form);
    setForm({ title: "", description: "", assignedTo: "" });
    alert("Task assigned successfully!");
    fetchMyAssignedTasks();
  };

  useEffect(() => {
    fetchUsers();
    fetchMyAssignedTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-xl mx-auto bg-black rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-extrabold border-b pb-4">Assign a Task</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-600 bg-gray-700 p-3 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-600 bg-gray-700 p-3 rounded-md"
            required
          />
          <select
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            className="w-full border border-gray-600 bg-gray-700 p-3 rounded-md"
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md w-full"
          >
            Assign Task
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Tasks Assigned By Me</h2>
          <ul className="space-y-2">
            {myAssignedTasks.length === 0 ? (
              <p className="text-gray-400">No tasks assigned yet.</p>
            ) : (
              myAssignedTasks.map((task) => (
                <li
                  key={task._id}
                  className="p-4 bg-gray-800 rounded-md border border-gray-700"
                >
                  <p className="text-lg font-bold">{task.title}</p>
                  <p>{task.description}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Assigned to: {task.assignedTo?.email || "Unassigned"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Assigned on: {new Date(task.createdAt).toLocaleString()}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssignTaskPage;
