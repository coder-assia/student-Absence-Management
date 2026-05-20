import { Navigate } from "react-router-dom";
import { dashboardPathForRole, getRole } from "../utils/roles";

export default function ProtectedRoute({ allowedRoles, children }) {
  const role = getRole();

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={dashboardPathForRole(role)} replace />;
  }

  return children;
}
