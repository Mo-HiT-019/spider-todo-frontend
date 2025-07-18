import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log("User protecterd",currentUser)


  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default ProtectedRoute;
