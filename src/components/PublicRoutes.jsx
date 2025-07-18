import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  console.log("User from publicroute",user)

  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;