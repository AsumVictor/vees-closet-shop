import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import PulseLoader from "../../frontend/src/components/loaders/pulseLoader";

const ProtectedRoute = () => {
  const location = useLocation();
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if(loading){
    return (
      <>
      < PulseLoader />
      </>
    )
  }

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
