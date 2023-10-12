import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { LoadAdmin } from "../../redux/actions/admin";
import PulseLoader from "../loaders/pulseLoader";

const AdminProtected = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading, isAdmin } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(LoadAdmin());
  }, []);

  if (isLoading) {
    return <PulseLoader />;
  }

  if (!isLoading && !isAdmin) {
    return (
      <Navigate
        to="/admin/login"
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

export default AdminProtected;
