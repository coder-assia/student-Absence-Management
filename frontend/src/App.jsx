import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Layout from "./layout/Layout";

import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Route>

    </Routes>
  );
}