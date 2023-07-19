import axios from "axios";
import React from "react";
import server from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        const errMessage = error.response
          ? error.response.data.message
          : error.message;
        toast.error(errMessage);
      });
  };

  return { logoutHandler };
}

export default useLogout;
