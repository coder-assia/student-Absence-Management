import { useEffect, useState } from "react";
import { getAbsences, deleteAbsence } from "../api/absenceApi";

export default function AbsenceTable({ onEdit, refresh }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, [refresh]);

  const load = () => {
    getAbsences()
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette absence ?")) {
      deleteAbsence(id)
        .then(() => load())
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="overflow-x-auto">

      <table className="w-full border border-gray-300 text-left">

        {/* HEADER */}
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Motif</th>
            <th className="p-3 border">Étudiant</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                Aucune absence
              </td>
            </tr>
          ) : (
            data.map((a) => (
              <tr key={a.id} className="border-t">

                <td className="p-3 border">
                  {a.date}
                </td>

                <td className="p-3 border">
                  {a.motif}
                </td>

                <td className="p-3 border">
                  {a.etudiant ? `${a.etudiant.nom} ${a.etudiant.prenom}` : "—"}
                </td>

                <td className="p-3 border space-x-2">

                  {/* EDIT */}
                  <button
                    onClick={() => onEdit(a)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
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