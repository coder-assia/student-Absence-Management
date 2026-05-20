import { useEffect, useRef, useState } from "react";
import {
  deleteAbsence,
  downloadJustification,
  getAbsences,
  justifyAbsence,
  searchAbsences,
} from "../api/absenceApi";

export default function AbsenceTable({
  onEdit,
  refresh,
  canEdit = false,
  canDelete = false,
  canJustify = false,
}) {
  const fileInputRef = useRef(null);
  const [selectedAbsenceId, setSelectedAbsenceId] = useState(null);
  const [absences, setAbsences] = useState([]);
  const [filters, setFilters] = useState({
    nom: "",
    matiere: "",
    date: "",
  });

  useEffect(() => {
    loadData();
  }, [refresh]);

  const loadData = () => {
    if (!filters.nom && !filters.matiere && !filters.date) {
      getAbsences()
        .then((res) => setAbsences(res.data))
        .catch((err) => console.log(err));
      return;
    }

    searchAbsences(filters)
      .then((res) => setAbsences(res.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (id) => {
    deleteAbsence(id).then(() => loadData());
  };

  const handleDownload = async (absence) => {
    const response = await downloadJustification(absence.id);
    const url = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = absence.justificationDocument || "justification";
    link.click();
    URL.revokeObjectURL(url);
  };

  const openJustificationPicker = (absenceId) => {
    setSelectedAbsenceId(absenceId);
    fileInputRef.current?.click();
  };

  const handleJustificationUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file || !selectedAbsenceId) {
      return;
    }

    const data = new FormData();
    data.append("justificationDocument", file);

    await justifyAbsence(selectedAbsenceId, data);
    e.target.value = "";
    setSelectedAbsenceId(null);
    loadData();
  };

  const showActions = canEdit || canDelete || canJustify;

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={handleJustificationUpload}
        className="hidden"
      />

      <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]">
        <input
          type="text"
          name="nom"
          placeholder="Nom etudiant"
          value={filters.nom}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
        />

        <input
          type="text"
          name="matiere"
          placeholder="Module"
          value={filters.matiere}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
        />

        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
        />

        <button
          onClick={loadData}
          className="rounded-md bg-slate-950 px-4 py-2 font-bold text-white transition hover:bg-emerald-700"
        >
          Rechercher
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3 text-left">Etudiant</th>
              <th className="p-3 text-left">Module</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Statut</th>
              <th className="p-3 text-left">Document</th>
              {showActions && <th className="p-3 text-left">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {absences.length === 0 ? (
              <tr>
                <td className="p-4 text-center text-slate-500" colSpan={showActions ? 6 : 5}>
                  Aucune absence
                </td>
              </tr>
            ) : (
              absences.map((absence) => (
                <tr key={absence.id} className="hover:bg-slate-50">
                  <td className="border-t border-slate-200 p-3 font-semibold">
                    {absence.etudiant ? `${absence.etudiant.nom} ${absence.etudiant.prenom}` : ""}
                  </td>
                  <td className="border-t border-slate-200 p-3">{absence.matiere}</td>
                  <td className="border-t border-slate-200 p-3">{absence.date}</td>
                  <td className="border-t border-slate-200 p-3">
                    <span
                      className={`rounded px-2 py-1 text-xs font-semibold ${
                        absence.justified
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {absence.justified ? "Justifiee" : "A justifier"}
                    </span>
                  </td>
                  <td className="border-t border-slate-200 p-3">
                    {absence.justificationDocument ? (
                      <button
                        onClick={() => handleDownload(absence)}
                        className="font-bold text-emerald-700 hover:underline"
                      >
                        Voir document
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>

                  {showActions && (
                    <td className="space-x-2 border-t border-slate-200 p-3">
                      {canJustify && !absence.justified && (
                        <button
                          onClick={() => openJustificationPicker(absence.id)}
                          className="rounded-md bg-emerald-100 px-3 py-1 font-bold text-emerald-700 hover:bg-emerald-200"
                        >
                          Justifier
                        </button>
                      )}

                      {canEdit && (
                        <button
                          onClick={() => onEdit?.(absence)}
                          className="rounded-md bg-sky-100 px-3 py-1 font-bold text-sky-700 hover:bg-sky-200"
                        >
                          Modifier
                        </button>
                      )}

                      {canDelete && (
                        <button
                          onClick={() => handleDelete(absence.id)}
                          className="rounded-md bg-red-100 px-3 py-1 font-bold text-red-700 hover:bg-red-200"
                        >
                          Supprimer
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
