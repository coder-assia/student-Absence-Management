import { useState } from "react";
import AbsenceForm from "../components/AbsenceForm";
import AbsenceTable from "../components/AbsenceTable";
import { canCreate, canModify } from "../utils/roles";

export default function AbsencePage() {
  const [selectedAbsence, setSelectedAbsence] = useState(null);
  const [refreshAbsences, setRefreshAbsences] = useState(false);
  const allowCreate = canCreate();
  const allowModify = canModify();

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-black">Registre des absences</h1>
        <p className="mt-1 text-slate-500">
          Acces adapte automatiquement au role connecte.
        </p>
      </section>

      {allowCreate && (
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-black">{allowModify && selectedAbsence ? "Modifier une absence" : "Ajouter une absence"}</h2>
          <AbsenceForm
            selected={allowModify ? selectedAbsence : null}
            allowUpdate={allowModify}
            onFinish={() => {
              setSelectedAbsence(null);
              setRefreshAbsences((value) => !value);
            }}
          />
        </section>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <AbsenceTable
          refresh={refreshAbsences}
          onEdit={(absence) => setSelectedAbsence(absence)}
          canEdit={allowModify}
          canDelete={allowModify}
        />
      </section>
    </div>
  );
}
