import { useState } from "react";
import server from "../server";
import { LabelInput } from "../components/inputs/labelInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const { state } = useLocation();
  const path = state?.pathname ? state.pathname : "/";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const canSubmit = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userIformation = {
      email,
      password,
    };

    axios
      .post(`${server}user/register`, userIformation, { withCredentials: true })
      .then((res) => {
        setEmail("");
        setPassword("");
        navigate(path, { replace: true });
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        let errMessage = err.response ? err.response.data.message : err.message;
        console.log(errMessage);
      });
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate(path);
  //   }
  // }, []);

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
        <div className="w-full flex flex-col gap-4">
          <LabelInput
            type={"firstName"}
            label={"firstName"}
            isRequired={true}
            value={firstName}
            handleChange={(e) => setFirstName(e.target.value)}
          />
          <LabelInput
            type={"lastName"}
            label={"lastName"}
            isRequired={true}
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <LabelInput
            label={"email"}
            type={"email"}
            isRequired={true}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <LabelInput
            type={"password"}
            label={"password"}
            isRequired={true}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <LabelInput
            type={"password"}
            label={"confirmPass"}
            isRequired={true}
            value={confirmPass}
            handleChange={(e) => setConfirmPass(e.target.value)}
          />

          <button
            type="submit"
            className="py-2 bg-primary-800 text-white font-semibold"
          >
            Login
          </button>
        </div>
        <p className="mt-2">
          Already have an account yet?
          <Link to={"/login"} className="ml-1 text-blue-700 underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
