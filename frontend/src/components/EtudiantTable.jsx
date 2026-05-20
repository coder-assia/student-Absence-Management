import { useEffect, useState } from "react";
import { deleteEtudiant, getEtudiants } from "../api/etudiantApi";

export default function EtudiantTable({ onEdit, refresh, canEdit = false, canDelete = false, compact = false }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, [refresh]);

  const loadData = () => {
    getEtudiants().then((res) => setData(res.data));
  };

  const handleDelete = (id) => {
    deleteEtudiant(id).then(() => loadData());
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white text-sm">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Prenom</th>
            {!compact && <th className="p-3 text-left">Email</th>}
            {!compact && <th className="p-3 text-left">Filiere</th>}
            {(canEdit || canDelete) && <th className="p-3 text-left">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((etudiant) => (
            <tr key={etudiant.id} className="hover:bg-slate-50">
              <td className="border-t border-slate-200 p-3 font-bold">{etudiant.nom}</td>
              <td className="border-t border-slate-200 p-3">{etudiant.prenom}</td>
              {!compact && <td className="border-t border-slate-200 p-3">{etudiant.email}</td>}
              {!compact && <td className="border-t border-slate-200 p-3">{etudiant.filiere}</td>}

              {(canEdit || canDelete) && (
                <td className="space-x-2 border-t border-slate-200 p-3">
                  {canEdit && (
                    <button
                      onClick={() => onEdit?.(etudiant)}
                      className="rounded-md bg-sky-100 px-3 py-1 font-bold text-sky-700 hover:bg-sky-200"
                    >
                      Modifier
                    </button>
                  )}

                  {canDelete && (
                    <button
                      onClick={() => handleDelete(etudiant.id)}
                      className="rounded-md bg-red-100 px-3 py-1 font-bold text-red-700 hover:bg-red-200"
                    >
                      Supprimer
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
