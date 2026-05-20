import { useEffect, useState } from "react";
import { getAbsences } from "../api/absenceApi";
import { getEtudiants } from "../api/etudiantApi";
import AbsenceTable from "../components/AbsenceTable";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [absences, setAbsences] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    getEtudiants().then((res) => setStudent(res.data?.[0] || null));
    getAbsences().then((res) => setAbsences(res.data || []));
  }, []);

  const absencesByModule = absences.reduce((groups, absence) => {
    const module = absence.matiere || "Sans module";
    groups[module] = groups[module] || [];
    groups[module].push(absence);
    return groups;
  }, {});

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <section className="rounded-lg bg-slate-950 p-6 text-white shadow-lg">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">Espace etudiant</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Mes absences par module</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Consultez chaque absence avec son module, son statut et son justificatif.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black">Mes informations</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Nom complet</dt>
              <dd className="font-bold text-slate-900">
                {student ? `${student.nom} ${student.prenom}` : "Chargement..."}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Email</dt>
              <dd className="font-bold text-slate-900">{student?.email || userEmail}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Classe / filiere</dt>
              <dd className="font-bold text-slate-900">{student?.filiere || "-"}</dd>
            </div>
          </dl>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(absencesByModule).length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-500 shadow-sm sm:col-span-2">
              Aucune absence enregistree.
            </div>
          ) : (
            Object.entries(absencesByModule).map(([module, items]) => (
              <div key={module} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-bold text-emerald-700">{module}</p>
                <p className="mt-2 text-3xl font-black text-slate-950">{items.length}</p>
                <p className="text-sm text-slate-500">
                  {items.filter((item) => item.justified).length} justifiee(s)
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-black">Detail des absences</h2>
        <AbsenceTable canJustify />
      </section>
    </div>
  );
}
