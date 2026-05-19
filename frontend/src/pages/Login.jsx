import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginRequest({ email, password });

      const data = response.data;

      // stockage
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.id);

      // redirection
      if (data.role === "ADMIN") navigate("/admin");
      else if (data.role === "STUDENT") navigate("/student");
      else if (data.role === "TEACHER") navigate("/teacher");

    } catch (error) {
      console.log(error);
      alert("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-6 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Sign In
        </button>

      </form>

    </div>
  );
}