import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/auth/signup", form);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-gray-800 rounded shadow-lg space-y-6 w-96"
      >
        <h2 className="text-3xl font-extrabold text-white text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="border border-gray-600 bg-gray-700 text-white p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-gray-600 bg-gray-700 text-white p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border border-gray-600 bg-gray-700 text-white p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-3 w-full rounded-md transition duration-300 ease-in-out">
          Sign Up
        </button>
        <div className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;