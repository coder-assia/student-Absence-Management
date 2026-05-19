import React, { useEffect, useState } from "react";

import {
  addEtudiant,
  updateEtudiant
} from "../api/etudiantApi";

export default function EtudiantForm({ selected, onFinish }) {

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    filiere: ""
  });

  useEffect(() => {
    if (selected) {
      setForm(selected);
    }
  }, [selected]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (form.id) {

      updateEtudiant(form.id, form)
        .then(() => onFinish());

    } else {

      addEtudiant(form)
        .then(() => onFinish());

    }

    setForm({
      nom: "",
      prenom: "",
      email: "",
      filiere: ""
    });
  };

  return (

    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={form.nom}
        onChange={handleChange}
      />

      <input
        type="text"
        name="prenom"
        placeholder="Prénom"
        value={form.prenom}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="filiere"
        placeholder="Filière"
        value={form.filiere}
        onChange={handleChange}
      />

      <button type="submit">

        {form.id ? "Modifier" : "Ajouter"}

      </button>

    </form>
  );
}