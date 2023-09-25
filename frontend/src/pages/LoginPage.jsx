import { useEffect, useState } from "react";
import server from "../server";
import { LabelInput } from "../components/inputs/labelInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function LoginPage() {
  const { isAuthenticated } = useSelector((state) => state.client);
  const { state } = useLocation();
  const path = state?.pathname ? state.pathname : "/";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const userIformation = {
      email,
      password,
    };

    axios
      .post(`${server}user/auth`, userIformation, { withCredentials: true })
      .then((res) => {
        setEmail("");
        setPassword("");
        navigate(path, { replace: true });
        window.location.reload(true);
      })
      .catch((err) => {
        setLoading(false);
        let errMessage = err.response?.data
          ? err.response.data.message
          : err.message;
        setError(errMessage);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(path);
    }
  }, []);

  return (
    <div className="w-full  overflow-y-auto h-screen py-20 flex flex-col justify-center items-center px-3">
      <img src="" alt="" />
      <h1 className="text-2xl font-medium">Welcome to Vees closet</h1>
      <p className="mt-5 py-1 w-full 400px:w-[10cm]">
        Stay connected with us! Log in to your account for the latest products.
      </p>
      <form
        className=" mt-10 py-1 w-full 400px:w-[10cm]"
        onSubmit={(e) => handleSubmit(e)}
      >
        {error && (
          <p className="text-red-800 text-center bg-red-100 py-1  mb-3">
            {error}
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
          <div className="flex flex-col w-full">
            <LabelInput
              type={"password"}
              label={"password"}
              isRequired={true}
              value={password}
              handleChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
            />
            <Link to={"/forgot-password"} className=" text-blue-700 underline">
              Forgot password
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className=" disabled:opacity-50 py-2 bg-primary-800 text-white font-semibold"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>
        <p className="mt-2">
          Don't have an account yet?{" "}
          <Link to={"/signup"} className=" text-blue-700 underline">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
