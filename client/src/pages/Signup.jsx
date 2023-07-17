import { useState, useEffect } from "react";
import { InputLabel, Button } from "../components/Inputs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import server from "../../server";
import { toast } from "react-toastify";
import Loader from "../components/loader/loader";
import { useSelector } from "react-redux";

function Signup() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[^\w\s]/.test(password);
  const hasMoreThan7char = password.trim().length >= 8;
  const passwordMatch = password === confirmPassword;
  const containNumbers = /\d+/.test(password);
  const isValidemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit =
    hasUppercase &&
    hasSpecialChar &&
    hasMoreThan7char &&
    passwordMatch &&
    fullname.trim() !== "" &&
    isValidemail &&
    containNumbers;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userIformation = {
      avatar: null,
      fullname,
      email,
      password,
    };

    axios
      .post(`${server}/user/create-user`, userIformation, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/signup/success", { state: { email } });
        setFullname("");
        setEmail("");
        setPassword("");
        setconfirmPassword("");
      })
      .catch((err) => {
        setLoading(false);
        let errMessage = err.response ? err.response.data.message : err.message;
        toast.error(errMessage);
      });
  };

  useEffect(() => {
    if (isAuthenticated===true) {
      navigate("/");
    }
  }, []);

  return (
    <div className="grid grid-cols-1 w-full min-h-screen">
      <div className="py-3 w-full order-1 flex flex-col justify-center items-center h-screen">
        <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl py-5 px-5">
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-wine_primary text-center">
            Create an account
          </h4>
          <p className="text-center">We're excited to welcome you</p>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <InputLabel
                label={"Full name"}
                type={"text"}
                value={fullname}
                handleChange={(e) => setFullname(e.target.value)}
                name={"userEmail"}
              />
              <InputLabel
                label={"Email"}
                type={"email"}
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                name={"userEmail"}
              />
              {email !== "" && !isValidemail && (
                <p className="text-red-700 -mt-5 font-semibold">
                  Provide valid email address
                </p>
              )}
              <InputLabel
                label={"Password"}
                type={"password"}
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
                name={"userPassword"}
              />
              <InputLabel
                label={"Confirm password"}
                type={"password"}
                value={confirmPassword}
                handleChange={(e) => setconfirmPassword(e.target.value)}
                name={"userPassword"}
              />
            </div>

            {(password || confirmPassword) && (
              <ul className="list-none">
                {!hasMoreThan7char && (
                  <li className="text-red-700 font-semibold text-[14px]">
                    Password must contain at least 8 characters
                  </li>
                )}
                {!containNumbers && (
                  <li className="text-red-700 font-semibold text-[14px]">
                    Password must contain at a digit
                  </li>
                )}
                {!hasUppercase && (
                  <li className="text-red-700 font-semibold text-[14px]">
                    Password must contain at least uppercase letter
                  </li>
                )}
                {!hasSpecialChar && (
                  <li className="text-red-700 font-semibold text-[14px]">
                    Password must contain at least a special characters
                  </li>
                )}
                {!passwordMatch && (
                  <li className="text-red-700 font-semibold text-[14px]">
                    Password must match with confirm password
                  </li>
                )}
              </ul>
            )}

            <Button
              classname={
                "mt-6 bg-wine_primary w-full flex flex-row justify-center items-center"
              }
              disabled={!canSubmit}
              handleClick={handleSubmit}
            >
              {loading ? (
                <Loader
                  extendclass={`h-[.7cm] w-[.7cm] border-[5px] border-white`}
                />
              ) : (
                "Sign up"
              )}
            </Button>
            <p className="mt-4 flex flex-row gap-1 text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              I already have an account?
              <Link
                className="font-medium text-wine_primary transition-colors hover:text-blue-700"
                to="../login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
