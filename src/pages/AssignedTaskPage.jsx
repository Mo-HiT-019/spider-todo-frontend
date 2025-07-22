import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const AssignedTasksPage = () => {
  const [assignedTasks, setAssignedTasks] = useState([]);

  const fetchAssignedTasks = async () => {
    const res = await axios.get("/todos/assigned-to-me");
    console.log("Got the assigned tasks",res.data.tasks)
    setAssignedTasks(res.data.tasks);
  };

  useEffect(() => {
    fetchAssignedTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-xl mx-auto bg-black rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-white border-b pb-4">Tasks Assigned To Me</h1>

        <ul className="space-y-3">
          {assignedTasks.map((todo) => (
            <li
              key={todo._id}
              className={`bg-gray-700 p-4 rounded-md shadow-sm ${
                todo.status === "completed" ? "opacity-70 line-through" : ""
              }`}
            >
              <div>
                <h2 className="font-semibold text-lg">{todo.title}</h2>
                <p className="text-sm text-gray-300">{todo.description}</p>

                <p className="text-xs text-gray-400">Assigned by: {todo.assignedBy?.email}</p>
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    todo.status === "completed" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  {todo.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssignedTasksPage;
