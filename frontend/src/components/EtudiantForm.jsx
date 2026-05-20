import { useEffect, useState } from "react";
import { addEtudiant, updateEtudiant } from "../api/etudiantApi";

const emptyForm = {
  nom: "",
  prenom: "",
  email: "",
  filiere: "",
};

export default function EtudiantForm({ selected, onFinish, allowUpdate = true }) {
  const [form, setForm] = useState({ ...emptyForm });

  useEffect(() => {
    setForm(selected ? selected : { ...emptyForm });
  }, [selected]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id && allowUpdate) {
      await updateEtudiant(form.id, form);
    } else {
      await addEtudiant(form);
    }

    setForm({ ...emptyForm });
    onFinish?.();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-4">
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={form.nom}
        onChange={handleChange}
        required
        className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
      />

      <input
        type="text"
        name="prenom"
        placeholder="Prenom"
        value={form.prenom}
        onChange={handleChange}
        required
        className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
      />

      <input
        type="text"
        name="filiere"
        placeholder="Filiere"
        value={form.filiere}
        onChange={handleChange}
        required
        className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
      />

      <button
        type="submit"
        className="rounded-md bg-slate-950 px-4 py-2 font-bold text-white transition hover:bg-emerald-700 md:col-span-4"
      >
        {form.id && allowUpdate ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
}
