import React, { useEffect, useState } from "react";

import {
  getEtudiants,
  deleteEtudiant
} from "../api/etudiantApi";

export default function EtudiantTable({ onEdit, refresh }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, [refresh]);

  const loadData = () => {
    getEtudiants()
      .then((res) => setData(res.data));
  };

  const handleDelete = (id) => {
    deleteEtudiant(id)
      .then(() => loadData());
  };

  return (

    <table className="w-full border border-gray-300">

      <thead className="bg-gray-100">

        <tr>
          <th className="p-3 border">Nom</th>
          <th className="p-3 border">Prénom</th>
          <th className="p-3 border">Email</th>
          <th className="p-3 border">Filière</th>
          <th className="p-3 border">Actions</th>
        </tr>

      </thead>

      <tbody>

        {data.map((e) => (

          <tr key={e.id}>

            <td className="p-3 border">{e.nom}</td>

            <td className="p-3 border">{e.prenom}</td>

            <td className="p-3 border">{e.email}</td>

            <td className="p-3 border">{e.filiere}</td>

            <td className="p-3 border space-x-2">

              <button
                onClick={() => onEdit(e)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(e.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );
}