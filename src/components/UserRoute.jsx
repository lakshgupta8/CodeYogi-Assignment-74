import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loading from "./Loading";

const UserRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserRoute;
