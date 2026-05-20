import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Layout from "./layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import { ROLES } from "./utils/roles";

import AbsencePage from "./pages/AbsencePage";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route element={<Layout />}>

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ETUDIANT]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ENSEIGNANT]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/absences"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.ENSEIGNANT, ROLES.ETUDIANT]}>
              <AbsencePage />
            </ProtectedRoute>
          }
        />

      </Route>

    </Routes>
  );
}
