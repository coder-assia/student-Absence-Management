import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest, signupRequest } from "../api/auth";
import { dashboardPathForRole, ROLES } from "../utils/roles";

const emptySignup = {
  nom: "",
  email: "",
  password: "",
  role: ROLES.ETUDIANT,
  matiere: "",
  filiere: "",
};

export default function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState({ ...emptySignup });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const storeSession = (data) => {
    localStorage.setItem("role", data.role);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("userName", data.nom);
    localStorage.setItem("userEmail", data.email);

    data.matiere ? localStorage.setItem("matiere", data.matiere) : localStorage.removeItem("matiere");
    data.filiere ? localStorage.setItem("filiere", data.filiere) : localStorage.removeItem("filiere");

    navigate(dashboardPathForRole(data.role));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginRequest({ email, password });
      storeSession(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Email ou mot de passe incorrect");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await signupRequest({
        ...signup,
        matiere: signup.role === ROLES.ENSEIGNANT ? signup.matiere : "",
      });
      storeSession(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Impossible de creer le compte");
    }
  };

  const updateSignup = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d8f3dc,transparent_30%),linear-gradient(135deg,#f8fafc,#eef2ff_45%,#fff7ed)] px-4 py-8 text-slate-950">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_440px]">
        <section className="hidden lg:block">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Gestion des absences</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-black leading-tight">
            Un espace clair pour admin, professeurs et etudiants.
          </h1>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {["Admin: tous les droits", "Prof: modules + classes", "Etudiant: absences par module"].map((item) => (
              <div key={item} className="rounded-lg border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur">
                <p className="text-sm font-bold text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </section>

      <form
        onSubmit={mode === "login" ? handleLogin : handleSignup}
        className="w-full rounded-lg border border-white/80 bg-white/85 p-6 shadow-xl shadow-slate-200/70 backdrop-blur"
      >
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Scolarite</p>
          <h2 className="mt-2 text-3xl font-black">{mode === "login" ? "Connexion" : "Inscription"}</h2>
          <p className="mt-2 text-sm text-slate-500">
            {mode === "login"
              ? "Connectez-vous, le role ouvre automatiquement le bon espace."
              : "Creez votre compte puis entrez directement dans votre espace."}
          </p>
        </div>

        <div className="mb-5 grid grid-cols-2 rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-md px-3 py-2 text-sm font-bold ${mode === "login" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-md px-3 py-2 text-sm font-bold ${mode === "signup" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}
          >
            Sign in
          </button>
        </div>

        {mode === "signup" && (
          <>
            <input
              className="mb-3 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              placeholder="Nom complet"
              name="nom"
              value={signup.nom}
              onChange={updateSignup}
              required
            />

            <select
              name="role"
              value={signup.role}
              onChange={updateSignup}
              className="mb-3 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            >
              <option value={ROLES.ETUDIANT}>Etudiant</option>
              <option value={ROLES.ENSEIGNANT}>Enseignant</option>
            </select>
          </>
        )}

        <input
          className="mb-3 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          placeholder="Email"
          value={mode === "login" ? email : signup.email}
          onChange={(e) => (mode === "login" ? setEmail(e.target.value) : updateSignup(e))}
          name="email"
          required
        />

        <input
          type="password"
          className="mb-3 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          placeholder="Mot de passe"
          value={mode === "login" ? password : signup.password}
          onChange={(e) => (mode === "login" ? setPassword(e.target.value) : updateSignup(e))}
          name="password"
          required
        />

        {mode === "signup" && (
          <>
            {signup.role === ROLES.ENSEIGNANT && (
              <input
                className="mb-3 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                placeholder="Modules enseignes: Java, Spring Boot"
                name="matiere"
                value={signup.matiere}
                onChange={updateSignup}
                required
              />
            )}
            <input
              className="mb-5 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              placeholder={signup.role === ROLES.ENSEIGNANT ? "Classes: Informatique, Reseaux" : "Classe / filiere"}
              name="filiere"
              value={signup.filiere}
              onChange={updateSignup}
              required
            />
          </>
        )}

        {error && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>}

        <button className="w-full rounded-md bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-emerald-700">
          {mode === "login" ? "Se connecter" : "Creer le compte"}
        </button>
      </form>
      </div>
    </div>
  );
}
