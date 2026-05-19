import { useEffect, useState } from "react";
import { addAbsence, updateAbsence } from "../api/absenceApi";
import { getEtudiants } from "../api/etudiantApi";

export default function AbsenceForm({ selected, onFinish }) {

  const [form, setForm] = useState({
    id: null,
    date: "",
    motif: "",
    etudiant: null,
    justified: false
  });

  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    getEtudiants().then(res => setEtudiants(res.data));
  }, []);

  useEffect(() => {
    if (selected) {
      setForm({
        id: selected.id,
        date: selected.date || "",
        motif: selected.motif || "",
        justified: selected.justified || false,
        etudiant: selected.etudiant
          ? { id: selected.etudiant.id }
          : null
      });
    }
  }, [selected]);

  const handleSubmit = (e) => {
  e.preventDefault();

  const payload = {
    date: form.date,
    motif: form.motif,
    justified: form.justified,
    etudiant: form.etudiant
      ? { id: Number(form.etudiant.id) }
      : null
  };

  console.log("PAYLOAD SENT:", payload);

  if (form.id) {
    updateAbsence(form.id, payload).then(onFinish);
  } else {
    addAbsence(payload).then(onFinish);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-2">

      <input
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <input
        placeholder="Motif"
        value={form.motif}
        onChange={(e) =>
          setForm({ ...form, motif: e.target.value })
        }
      />

      <select
        value={form.etudiant?.id || ""}
        onChange={(e) =>
          setForm({
            ...form,
            etudiant: { id: Number(e.target.value) }
          })
        }
      >
        <option value="">Choisir étudiant</option>

        {etudiants.map(e => (
          <option key={e.id} value={e.id}>
            {e.nom} {e.prenom}
          </option>
        ))}
      </select>

      <button type="submit">
        {form.id ? "Update" : "Add"}
      </button>

    </form>
  );
}