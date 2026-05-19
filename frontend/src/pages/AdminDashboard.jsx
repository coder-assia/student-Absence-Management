import { useState } from "react";

import EtudiantForm from "../components/EtudiantForm";
import EtudiantTable from "../components/EtudiantTable";

import AbsenceForm from "../components/AbsenceForm";
import AbsenceTable from "../components/AbsenceTable";

export default function AdminDashboard() {

  // ======================
  // STATE ÉTUDIANTS
  // ======================
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);
  const [refreshEtudiants, setRefreshEtudiants] = useState(false);

  // ======================
  // STATE ABSENCES
  // ======================
  const [selectedAbsence, setSelectedAbsence] = useState(null);
  const [refreshAbsences, setRefreshAbsences] = useState(false);

  return (
    <div className="space-y-10">

      {/* ======================= */}
      {/* 📊 STATISTIQUES */}
      {/* ======================= */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Students</p>
          <h2 className="text-2xl font-bold">120</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Teachers</p>
          <h2 className="text-2xl font-bold">12</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Absences</p>
          <h2 className="text-2xl font-bold">18</h2>
        </div>

      </div>

      {/* ======================= */}
      {/* 👨‍🎓 GESTION ÉTUDIANTS */}
      {/* ======================= */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Gestion des étudiants
        </h2>

        <EtudiantForm

          selected={selectedEtudiant}

          onFinish={() => {
            setSelectedEtudiant(null);
            setRefreshEtudiants(!refreshEtudiants);
          }}

        />

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <EtudiantTable

          onEdit={(e) => setSelectedEtudiant(e)}

          refresh={refreshEtudiants}

        />

      </div>

      {/* ======================= */}
      {/* 🚨 GESTION ABSENCES */}
      {/* ======================= */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Gestion des absences
        </h2>

        <AbsenceForm

          selected={selectedAbsence}

          onFinish={() => {
            setSelectedAbsence(null);
            setRefreshAbsences(!refreshAbsences);
          }}

        />

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <AbsenceTable

          onEdit={(a) => setSelectedAbsence(a)}

          refresh={refreshAbsences}

        />

      </div>

    </div>
  );
}