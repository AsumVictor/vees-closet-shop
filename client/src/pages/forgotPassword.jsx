import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LabelInput } from "../components/inputs/labelInput";
import { Si1Password } from "react-icons/si";
import { MdError } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import server from "../server";

function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios
      .post(`${server}user/request-reset?email=${email}`)
      .then((res) => {
        toast.success(res.data.message);
        setEmail("");
        navigate("/login", { replace: false });
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
    <div className="mt-14 px-3 py-20 flex flex-col items-center justify-center">
      <Si1Password size={35} className=" text-primary-600" />
      <h1 className="text-2xl font-extrabold">FORGOT PASSWORD</h1>
      <p className="mt-2 text-[14px] font-semibold text-gray-400 py-1 w-full 400px:w-[10cm] text-center">
        Provide the deatils below to reset password
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
        <div className="w-full flex flex-col gap-4">
          <LabelInput
            label={"email"}
            type={"email"}
            isRequired={true}
            value={email}
            handleChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className=" disabled:opacity-50 py-2 bg-primary-800 text-white font-semibold"
          >
            {loading ? "Submitting" : "Reset Password"}
          </button>
        </div>
        <p className="mt-2">
          Do you have your password now?{" "}
          <Link to={"/login"} className=" text-blue-700 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgetPasswordPage;
