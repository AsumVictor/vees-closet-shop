import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

function UserAccountIcon() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('login')
  }

  return (
    <div className="px-2 cursor-pointer" onClick={()=>handleClick()}>
      <FiUser size={22} />
    </div>
  );
}

export default UserAccountIcon;
