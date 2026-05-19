import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h1 className="text-xl font-bold mb-6">
          Absence System
        </h1>

        <nav className="flex flex-col gap-2 text-gray-700">
          <a className="p-2 rounded hover:bg-gray-100">Dashboard</a>
          <a className="p-2 rounded hover:bg-gray-100">Students</a>
          <a className="p-2 rounded hover:bg-gray-100">Absences</a>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-14 bg-white shadow flex items-center justify-between px-6">
          <h2 className="font-semibold">Dashboard</h2>
          <span className="text-sm text-gray-500">Admin</span>
        </header>

        {/* Page content */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}