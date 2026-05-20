import { useState } from "react";
import AbsenceForm from "../components/AbsenceForm";
import AbsenceTable from "../components/AbsenceTable";
import EtudiantTable from "../components/EtudiantTable";
import { splitList } from "../utils/roles";

export default function TeacherDashboard() {
  const [refreshAbsences, setRefreshAbsences] = useState(false);
  const matiere = localStorage.getItem("matiere") || "";
  const filiere = localStorage.getItem("filiere") || "";
  const modules = splitList(matiere);
  const classes = splitList(filiere);

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Espace enseignant</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-950">Feuille d'appel</h1>
            <p className="mt-1 text-slate-600">
              Choisissez un module, puis marquez les absences des classes affectees.
            </p>
          </div>
          <span className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
            Enseignant
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Modules</p>
            <div className="flex flex-wrap gap-2">
              {(modules.length ? modules : ["Aucun module"]).map((module) => (
                <span key={module} className="rounded-md bg-slate-900 px-3 py-1 text-sm font-bold text-white">
                  {module}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Classes</p>
            <div className="flex flex-wrap gap-2">
              {(classes.length ? classes : ["Aucune classe"]).map((classe) => (
                <span key={classe} className="rounded-md bg-amber-100 px-3 py-1 text-sm font-bold text-amber-900">
                  {classe}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black">Etudiants de mes classes</h2>
          <p className="mt-1 text-sm text-slate-500">
            La liste est filtree automatiquement selon vos classes.
          </p>
          <div className="mt-4">
            <EtudiantTable refresh={refreshAbsences} compact />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black">Marquer une absence</h2>
          <p className="mt-1 text-sm text-slate-500">
            Choisissez l'etudiant et le module concerne.
          </p>
          <div className="mt-4">
            <AbsenceForm
              fixedMatiere={matiere}
              onFinish={() => setRefreshAbsences((value) => !value)}
              allowUpdate={false}
            />
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-black">Absences de mes modules</h2>
        <AbsenceTable refresh={refreshAbsences} />
      </section>
    </div>
  );
}
