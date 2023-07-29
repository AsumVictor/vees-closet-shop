import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const ShopRoutes = () => {
  const location = useLocation();
  const { isSeller, seller, isLoading } = useSelector((state) => state.shop);
  if (!isLoading) {
    if (!isSeller || !seller) {
      return (
        <Navigate
          to="/shop/login"
          replace
          state={{
            message: "Login in to continue.",
            pathname: location.pathname,
          }}
        />
      );
    } else {
      return <Outlet />;
    }
  }
};

export default ShopRoutes;
