import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if(loading){
    return (
      <>
      <h1>Loading..</h1>
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
