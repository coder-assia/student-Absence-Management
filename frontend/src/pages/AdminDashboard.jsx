import { useState } from "react";

import EtudiantForm from "../components/EtudiantForm";
import EtudiantTable from "../components/EtudiantTable";

export default function AdminDashboard() {

  const [selected, setSelected] = useState(null);

  const [refresh, setRefresh] = useState(false);

  return (

    <div className="space-y-8">

      {/* STATISTIQUES */}

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

      {/* GESTION ETUDIANTS */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Gestion des étudiants
        </h2>

        <EtudiantForm

          selected={selected}

          onFinish={() => {

            setSelected(null);

            setRefresh(!refresh);

          }}

        />

      </div>

      {/* TABLEAU */}

      <div className="bg-white p-6 rounded-xl shadow">

        <EtudiantTable

          onEdit={(e) => setSelected(e)}

          refresh={refresh}

        />

      </div>

    </div>
  );
}