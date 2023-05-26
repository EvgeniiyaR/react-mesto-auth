import { Navigate } from "react-router-dom";

const ProtectedRouteElement = (props) => {
  return (
    props.isLoggedIn ? props.element : <Navigate to="/sign-in" replace />
)};

export default ProtectedRouteElement;