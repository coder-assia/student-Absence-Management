import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function Layout() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">

        <h1 className="text-xl font-bold mb-6">
          Absence System
        </h1>

        <nav className="flex flex-col gap-2 text-gray-700">

          <a className="p-2 rounded hover:bg-gray-100">
            Dashboard
          </a>

          <a className="p-2 rounded hover:bg-gray-100">
            Students
          </a>

          <a className="p-2 rounded hover:bg-gray-100">
            Absences
          </a>

        </nav>

      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-14 bg-white shadow flex items-center justify-between px-6">

          <h2 className="font-semibold">
            Dashboard
          </h2>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* ROLE */}
            <span className="text-sm text-gray-500">
              {role}
            </span>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>

          </div>

        </header>

        {/* Page content */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}