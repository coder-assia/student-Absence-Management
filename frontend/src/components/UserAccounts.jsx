import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../api/userApi";
import { roleLabel } from "../utils/roles";

export default function UserAccounts() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    getUsers().then((res) => setUsers(res.data));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Classes</th>
              <th className="p-3 text-left">Modules</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="border-t border-slate-200 p-3 font-bold">{user.nom}</td>
                <td className="border-t border-slate-200 p-3">{user.email}</td>
                <td className="border-t border-slate-200 p-3">
                  <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-800">
                    {roleLabel(user.role)}
                  </span>
                </td>
                <td className="border-t border-slate-200 p-3">{user.filiere || "-"}</td>
                <td className="border-t border-slate-200 p-3">{user.matiere || "-"}</td>
                <td className="border-t border-slate-200 p-3">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="rounded-md bg-red-50 px-3 py-1 font-bold text-red-700 hover:bg-red-100"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
