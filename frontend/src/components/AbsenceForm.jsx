import { useEffect, useState } from "react";
import { addAbsence, updateAbsence } from "../api/absenceApi";
import { getEtudiants } from "../api/etudiantApi";
import { splitList } from "../utils/roles";

const emptyForm = {
  etudiantId: "",
  matiere: "",
  date: "",
  justified: false,
};

const getErrorMessage = (err) => {
  const data = err.response?.data;

  if (typeof data === "string") {
    return data;
  }

  return data?.message || data?.error || err.message || "Impossible d'enregistrer cette absence";
};

export default function AbsenceForm({ selected, onFinish, allowUpdate = true, fixedMatiere = "" }) {
  const [form, setForm] = useState({ ...emptyForm });
  const [justificationDocument, setJustificationDocument] = useState(null);
  const [etudiants, setEtudiants] = useState([]);
  const [error, setError] = useState("");
  const moduleOptions = splitList(fixedMatiere);

  useEffect(() => {
    getEtudiants()
      .then((res) => setEtudiants(res.data))
      .catch(() => setError("Impossible de charger la liste des etudiants"));
  }, []);

  useEffect(() => {
    setJustificationDocument(null);

    if (!selected) {
      setForm({ ...emptyForm, matiere: moduleOptions[0] || fixedMatiere });
      return;
    }

    setForm({
      id: selected.id,
      etudiantId: selected.etudiant?.id || "",
      matiere: selected.matiere || moduleOptions[0] || fixedMatiere || "",
      date: selected.date || "",
      justified: Boolean(selected.justified),
    });
  }, [selected, fixedMatiere]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "justified" ? value === "true" : value,
    });
  };

  const handleFileChange = (e) => {
    setJustificationDocument(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = new FormData();
    data.append("etudiantId", Number(form.etudiantId));
    data.append("matiere", form.matiere.trim());
    data.append("date", form.date);
    data.append("justified", form.justified);

    if (form.justified && justificationDocument) {
      data.append("justificationDocument", justificationDocument);
    }

    try {
      if (form.id && allowUpdate) {
        await updateAbsence(form.id, data);
      } else {
        await addAbsence(data);
      }

      setForm({ ...emptyForm });
      setJustificationDocument(null);
      onFinish?.();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-3">
      <select
        name="etudiantId"
        value={form.etudiantId}
        onChange={handleChange}
        required
        className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
      >
        <option value="">Selection etudiant</option>
        {etudiants.map((etudiant) => (
          <option key={etudiant.id} value={etudiant.id}>
            {etudiant.nom} {etudiant.prenom}
          </option>
        ))}
      </select>

      {moduleOptions.length > 0 ? (
        <select
          name="matiere"
          value={form.matiere}
          onChange={handleChange}
          required
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
        >
          {moduleOptions.map((module) => (
            <option key={module} value={module}>
              {module}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          name="matiere"
          value={form.matiere}
          onChange={handleChange}
          placeholder="Module"
          required
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
        />
      )}

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
      />

      <select
        name="justified"
        value={String(form.justified)}
        onChange={handleChange}
        className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
      >
        <option value="false">Non justifiee</option>
        <option value="true">Justifiee</option>
      </select>

      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={handleFileChange}
        disabled={!form.justified}
        className="rounded-md border border-slate-300 px-3 py-2 disabled:bg-slate-100 md:col-span-2"
      />

      <button type="submit" className="rounded-md bg-slate-950 px-4 py-2 font-bold text-white transition hover:bg-emerald-700">
        {form.id && allowUpdate ? "Modifier" : "Ajouter"}
      </button>

      {error && <p className="text-red-600 md:col-span-3">{error}</p>}
    </form>
  );
}
