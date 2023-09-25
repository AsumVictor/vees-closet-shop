import React from "react";
import { useSelector } from "react-redux";

function MyAccount() {
  const { user } = useSelector((state) => state.client);

  return (
    <div className=" w-full ">
      <h1>
        Hello, {user.first_name} {user.last_name}
      </h1>
      <p>{user.email}</p>

      <div className=" mt-10 w-full">
        <p className="w-10/12">
          🎉 You've found your digital paradise for all things fashion, tech,
          home, and beyond. Get ready for a shopping journey like no other!
        </p>
      </div>
    </div>
  );
}

export default MyAccount;
