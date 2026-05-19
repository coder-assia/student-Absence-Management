import { useEffect, useState } from "react";
import { addAbsence, updateAbsence } from "../api/absenceApi";
import { getEtudiants } from "../api/etudiantApi";

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

export default function AbsenceForm({ selected, onFinish }) {
  const [form, setForm] = useState({ ...emptyForm });
  const [justificationDocument, setJustificationDocument] = useState(null);
  const [etudiants, setEtudiants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getEtudiants()
      .then((res) => setEtudiants(res.data))
      .catch(() => setError("Impossible de charger la liste des etudiants"));
  }, []);

  useEffect(() => {
    setJustificationDocument(null);

    if (!selected) {
      setForm({ ...emptyForm });
      return;
    }

    setForm({
      id: selected.id,
      etudiantId: selected.etudiant?.id || "",
      matiere: selected.matiere || "",
      date: selected.date || "",
      justified: Boolean(selected.justified),
    });
  }, [selected]);

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
      if (form.id) {
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
        className="border p-2 rounded"
      >
        <option value="">Selection etudiant</option>
        {etudiants.map((etudiant) => (
          <option key={etudiant.id} value={etudiant.id}>
            {etudiant.nom} {etudiant.prenom}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="matiere"
        value={form.matiere}
        onChange={handleChange}
        placeholder="Matiere"
        required
        className="border p-2 rounded"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />

      <select
        name="justified"
        value={String(form.justified)}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="false">Non justifiee</option>
        <option value="true">Justifiee</option>
      </select>

      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={handleFileChange}
        disabled={!form.justified}
        className="border p-2 rounded disabled:bg-gray-100 md:col-span-2"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {form.id ? "Modifier" : "Ajouter"}
      </button>

      {error && <p className="text-red-600 md:col-span-3">{error}</p>}
    </form>
  );
}
