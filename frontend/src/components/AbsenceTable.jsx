import { useEffect, useState } from "react";
import { deleteAbsence, getAbsences, getJustificationUrl } from "../api/absenceApi";

export default function AbsenceTable({ onEdit, refresh }) {
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    loadData();
  }, [refresh]);

  const loadData = () => {
    getAbsences().then((res) => setAbsences(res.data));
  };

  const handleDelete = (id) => {
    deleteAbsence(id).then(() => loadData());
  };

  return (
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
              <td className="p-4 text-center text-gray-500" colSpan="6">
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
                <td className="p-3 border">{absence.matiere}</td>
                <td className="p-3 border">{absence.date}</td>
                <td className="p-3 border">{absence.justified ? "Oui" : "Non"}</td>
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
  );
}
