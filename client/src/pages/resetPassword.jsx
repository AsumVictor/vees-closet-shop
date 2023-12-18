import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LabelInput } from "../components/inputs/labelInput";
import { SiAuth0 } from "react-icons/si";
import { MdError } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import server from "../server";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  let href = searchParams.get("href");
  let email = searchParams.get("m");

  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let res = await axios.post(`${server}user/reset?href=${href}&m=${email}`);
      if (res.data.success) {
        toast.success(res.data.message);
        setPassword("");
        setConfirmPass("");
        navigate("/login", { replace: false });
      }
    } catch (err) {
      setLoading(false);
      let errMessage = err.response?.data
        ? err.response.data.message
        : err.message;
      setError(errMessage);
    }
  };

  return (
    <div className="mt-14 px-3 py-20 flex flex-col items-center justify-center">
      <SiAuth0 size={35} className=" text-primary-600" />
      <h1 className="text-2xl font-extrabold">RESET PASSWORD</h1>
      <p className="mt-2 text-[14px] font-semibold text-gray-400 py-1 w-full 400px:w-[10cm] text-center">
        Provide your new password credetials. Keep your password secure
      </p>
      <form
        className=" mt-10 py-1 w-full 400px:w-[10cm]"
        onSubmit={(e) => handleSubmit(e)}
      >
        {error && (
          <p className="text-red-800 bg-red-100 py-1 px-2 rounded-md border border-red-300 font-bold mb-3 grid grid-cols-12">
            <MdError size={22} />
            <span className=" text-start col-span-11">{error}</span>
          </p>
        )}
        <div className="w-full flex flex-col gap-4 mt-4">
          <LabelInput
            label={"New password"}
            type={"password"}
            isRequired={true}
            value={password}
            handleChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
          />

          <LabelInput
            label={"Confirm Password"}
            type={"password"}
            isRequired={true}
            value={confirmPass}
            handleChange={(e) => {
              setConfirmPass(e.target.value);
              setError(null);
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className=" disabled:opacity-50 py-2 bg-primary-800 text-white font-semibold"
          >
            {loading ? "Reseting" : "Reset Password"}
          </button>
        </div>
        <p className="mt-2 text-center text-[14px] font-semibold text-gray-400">Don't share your password with anyone.</p>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
