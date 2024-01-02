import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      alert("login required");
    }
  }, [navigate, user]);

  return user ? children : null;
};

export default ProtectedRoute;
