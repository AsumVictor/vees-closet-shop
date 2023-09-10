import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.client);

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          message: "You must login first",
          pathname: location.pathname,
        }}
      />
    );
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
