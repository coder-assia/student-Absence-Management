import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { getRole, roleLabel, ROLES } from "../utils/roles";

export default function Layout() {

  const navigate = useNavigate();
  const location = useLocation();

  const role = getRole();
  const userName = localStorage.getItem("userName") || "Utilisateur";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = [
    { label: "Administration", path: "/admin", roles: [ROLES.ADMIN] },
    { label: "Mes modules", path: "/teacher", roles: [ROLES.ENSEIGNANT] },
    { label: "Mes absences", path: "/student", roles: [ROLES.ETUDIANT] },
    { label: "Registre", path: "/absences", roles: [ROLES.ADMIN, ROLES.ENSEIGNANT, ROLES.ETUDIANT] },
  ].filter((link) => link.roles.includes(role));

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-950">
      <aside className="hidden w-72 border-r border-slate-200 bg-white px-5 py-6 md:block">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Scolarite</p>
          <h1 className="mt-2 text-2xl font-black">Absences</h1>
          <p className="mt-1 text-sm text-slate-500">Gestion par roles, modules et classes.</p>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-md px-4 py-3 text-sm font-bold transition ${
                  active
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Bienvenue, {userName}</p>
              <h2 className="text-xl font-black">{roleLabel(role)}</h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
                {role}
              </span>
            <button
              onClick={handleLogout}
                className="rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
            >
                Deconnexion
            </button>
          </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
