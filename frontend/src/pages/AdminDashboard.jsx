import { useState } from "react";
import AbsenceForm from "../components/AbsenceForm";
import AbsenceTable from "../components/AbsenceTable";
import EtudiantForm from "../components/EtudiantForm";
import EtudiantTable from "../components/EtudiantTable";
import UserAccounts from "../components/UserAccounts";

export default function AdminDashboard() {
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);
  const [refreshEtudiants, setRefreshEtudiants] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState(null);
  const [refreshAbsences, setRefreshAbsences] = useState(false);

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <section className="rounded-lg bg-slate-950 p-6 text-white shadow-lg">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">Administration</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Gestion globale</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          L'admin garde tous les droits d'acces: etudiants, absences, comptes et justifications.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-1 text-lg font-black">Comptes inscrits</h2>
          <p className="mb-4 text-sm text-slate-500">
            Les utilisateurs creent leurs comptes depuis l'inscription. L'admin supervise et peut supprimer les comptes incorrects.
          </p>
          <UserAccounts />
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-black">Etudiant</h2>
          <EtudiantForm
            selected={selectedEtudiant}
            onFinish={() => {
              setSelectedEtudiant(null);
              setRefreshEtudiants((value) => !value);
            }}
          />
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-black">Absence</h2>
          <AbsenceForm
            selected={selectedAbsence}
            onFinish={() => {
              setSelectedAbsence(null);
              setRefreshAbsences((value) => !value);
            }}
          />
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-black">Liste des etudiants</h2>
        <EtudiantTable
          onEdit={(etudiant) => setSelectedEtudiant(etudiant)}
          refresh={refreshEtudiants}
          canEdit
          canDelete
        />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-black">Toutes les absences</h2>
        <AbsenceTable
          onEdit={(absence) => setSelectedAbsence(absence)}
          refresh={refreshAbsences}
          canEdit
          canDelete
        />
      </section>
    </div>
  );
}
