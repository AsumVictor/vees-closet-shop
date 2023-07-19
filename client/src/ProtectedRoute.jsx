import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  if (loading === false) {
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
    return children;
  }
};

export default ProtectedRoute;
