import { useState } from "react";
import AbsenceForm from "../components/AbsenceForm";
import AbsenceTable from "../components/AbsenceTable";

export default function AbsencePage() {
  const [selectedAbsence, setSelectedAbsence] = useState(null);
  const [refreshAbsences, setRefreshAbsences] = useState(false);

  const handleFinish = () => {
    setSelectedAbsence(null);
    setRefreshAbsences((prev) => !prev);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des absences</h1>

      <AbsenceForm selected={selectedAbsence} onFinish={handleFinish} />

      <AbsenceTable
        onEdit={(absence) => setSelectedAbsence(absence)}
        refresh={refreshAbsences}
      />
    </div>
  );
}
