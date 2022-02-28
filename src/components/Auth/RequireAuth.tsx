import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/store";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useAppSelector((state) => state.user.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}
