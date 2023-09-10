import React, { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import { LabelInput } from "../../inputs/labelInput";
import server from "../../../server";
import axios from "axios";
import { toast } from "react-toastify";

function Security() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const userIformation = {
      oldPassword: currentPass,
      newPassword: newPass,
      confirmPassword: confirmNewPass,
    };

    axios
      .put(`${server}user/update-user-password`, userIformation, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setConfirmNewPass("");
          setCurrentPass("");
          setNewPass("");
          setLoading(false);
          toast.success(res.data.message, {
            toastId: "updatePassSuccess",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        let errMessage = err.response?.data
          ? err.response.data.message
          : err.message;
        setError(errMessage);
      });
  };

  return (
    <div className="w-full">
      <div className="w-full py-1 flex flex-row gap-4 px-3 items-end">
        <Link to={".."} relative={"path"} className=" 650px:hidden">
          <MdOutlineKeyboardBackspace size={31} />
        </Link>
        <h1 className="text-xl">Change Password</h1>
      </div>
      <div className="w-full flex flex-row mt-10 pr-10 gap-4 px-3 items-end justify-between">
        <h2 className="text-xl bg-white font-semibold">Security Settings</h2>
      </div>
      <form
        className="w-full px-3 mt-10 flex flex-col gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        {error && (
          <p className="text-red-800 text-center bg-red-100 py-1">{error}</p>
        )}
        <div className="">
          <LabelInput
            label={"Current Password"}
            type={"password"}
            value={currentPass}
            isRequired={true}
            handleChange={(e) => setCurrentPass(e.target.value)}
          />
        </div>
        <div className="">
          <LabelInput
            label={"New Password"}
            type={"password"}
            value={newPass}
            isRequired={true}
            handleChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        <div className="">
          <LabelInput
            label={"confirm new Password"}
            type={"password"}
            value={confirmNewPass}
            isRequired={true}
            handleChange={(e) => setConfirmNewPass(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 bg-deep-primary text-white font-medium disabled:opacity-30"
        >
          {loading ? "Please wait..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

export default Security;
