import { useEffect, useState } from "react";

import {
  deleteAbsence,
  getAbsences,
  getJustificationUrl,
  searchAbsences
} from "../api/absenceApi";

export default function AbsenceTable({ onEdit, refresh }) {

  const [absences, setAbsences] = useState([]);

  // =========================
  // 🔎 FILTERS
  // =========================
  const [filters, setFilters] = useState({
    nom: "",
    matiere: "",
    date: ""
  });

  // =========================
  // 📥 LOAD DATA
  // =========================
  useEffect(() => {
    loadData();
  }, [refresh]);

  const loadData = () => {

    // si aucun filtre → toutes les absences
    if (
      !filters.nom &&
      !filters.matiere &&
      !filters.date
    ) {

      getAbsences()
        .then((res) => setAbsences(res.data))
        .catch((err) => console.log(err));

    } else {

      // 🔎 recherche filtrée
      searchAbsences(filters)
        .then((res) => setAbsences(res.data))
        .catch((err) => console.log(err));

    }

  };

  // =========================
  // 🔎 HANDLE INPUTS
  // =========================
  const handleChange = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });

  };

  // =========================
  // 🔎 SEARCH
  // =========================
  const handleSearch = () => {
    loadData();
  };

  // =========================
  // ❌ DELETE
  // =========================
  const handleDelete = (id) => {

    deleteAbsence(id)
      .then(() => loadData());

  };

  return (

    <div className="space-y-6">

      {/* ====================== */}
      {/* 🔎 FILTRES */}
      {/* ====================== */}
      <div className="flex gap-4">

        <input
          type="text"
          name="nom"
          placeholder="Nom étudiant"
          value={filters.nom}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          name="matiere"
          placeholder="Matière"
          value={filters.matiere}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Rechercher
        </button>

      </div>

      {/* ====================== */}
      {/* 📊 TABLE */}
      {/* ====================== */}
      <div className="overflow-x-auto">

        <table className="w-full border border-gray-300">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 border">Etudiant</th>
              <th className="p-3 border">Matiere</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Justifiee</th>
              <th className="p-3 border">Document</th>
              <th className="p-3 border">Actions</th>

            </tr>

          </thead>

          <tbody>

            {absences.length === 0 ? (

              <tr>

                <td
                  className="p-4 text-center text-gray-500"
                  colSpan="6"
                >
                  Aucune absence
                </td>

              </tr>

            ) : (

              absences.map((absence) => (

                <tr key={absence.id}>

                  <td className="p-3 border">

                    {absence.etudiant
                      ? `${absence.etudiant.nom} ${absence.etudiant.prenom}`
                      : ""}

                  </td>

                  <td className="p-3 border">
                    {absence.matiere}
                  </td>

                  <td className="p-3 border">
                    {absence.date}
                  </td>

                  <td className="p-3 border">

                    {absence.justified ? "Oui" : "Non"}

                  </td>

                  <td className="p-3 border">

                    {absence.justificationDocument ? (

                      <a
                        href={getJustificationUrl(absence.id)}
                        className="text-blue-600 underline"
                      >
                        Voir document
                      </a>

                    ) : (

                      "-"

                    )}

                  </td>

                  <td className="p-3 border space-x-2">

                    <button
                      onClick={() => onEdit?.(absence)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => handleDelete(absence.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Supprimer
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}