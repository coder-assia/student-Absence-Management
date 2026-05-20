export const ROLES = {
  ADMIN: "ADMIN",
  ENSEIGNANT: "ENSEIGNANT",
  ETUDIANT: "ETUDIANT",
};

export const getRole = () => localStorage.getItem("role");

export const canCreate = (role = getRole()) =>
  [ROLES.ADMIN, ROLES.ENSEIGNANT].includes(role);

export const canModify = (role = getRole()) => role === ROLES.ADMIN;

export const dashboardPathForRole = (role = getRole()) => {
  if (role === ROLES.ADMIN) return "/admin";
  if (role === ROLES.ENSEIGNANT) return "/teacher";
  if (role === ROLES.ETUDIANT) return "/student";
  return "/";
};

export const roleLabel = (role = getRole()) => {
  if (role === ROLES.ADMIN) return "Administrateur";
  if (role === ROLES.ENSEIGNANT) return "Enseignant";
  if (role === ROLES.ETUDIANT) return "Etudiant";
  return "Invite";
};

export const splitList = (value) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
