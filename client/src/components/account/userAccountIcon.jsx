import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";

function UserAccountIcon() {
  const { isAuthenticated } = useSelector((state) => state.client);
  const navigate = useNavigate();
  const handleClick = () => {
    if (isAuthenticated) {
      return navigate("/my-account");
    }
    navigate("/login");
  };

  return (
    <div className="px-2 cursor-pointer" onClick={() => handleClick()}>
      <FiUser size={22} />
    </div>
  );
}

export default UserAccountIcon;
