import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import server from "../../server";
import Lottie from "lottie-react";
import CheckSuccess from "../assets/Animation/checkSuccess.json";
import loader from "../assets/Animation/loading.json";
import { toast } from "react-toastify";

function Activation() {
  const navigate = useNavigate();
  let content;
  const { url } = useParams();
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);
  const [activated, setActivated] = useState(false);
  const token = { activation_token: url };

  useEffect(() => {
    if (url) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/user/activation`, token, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res) {
            setloading(false);
            setActivated(true);

             setTimeout(() => {
               navigate('/')
             }, 3000);
            toast.success("Your account is now active");
          }
        } catch (err) {
          let errMessage = err.response
            ? err.response.data.message
            : err.message;
          setError(errMessage);
          setloading(true);
        }
      };
      activationEmail();
    }
  }, []);

  if (loading) {
    content = (
      <>
        <div className="w-full flex items-center pt-10 justify-center px-2 400px:px-5 pb-20">
          <div className=" w-full md:w-8/12 lg:w-6/12 py-10 gap-5 rounded-lg bg-white shadow-2xl flex flex-col items-center justify-center">
            <Lottie animationData={loader} className="w-[5cm]" loop={true} />
            <h2 className="text-[17px] w-10/12 text-center">Waiting...</h2>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    content = (
      <>
        <div className="w-full flex items-center pt-10 justify-center px-2 400px:px-5 pb-20">
          <div className=" w-full md:w-8/12 lg:w-6/12 py-10 gap-5 rounded-lg bg-white shadow-2xl flex flex-col items-center justify-center">
            <h2 className="text-[20px] w-10/12 text-center font-bold text-red-600">
              Oops! Error occured!
            </h2>
            <p>{error}</p>
          </div>
        </div>
      </>
    );
  }

  if (activated) {
    content = (
      <>
        <div className="w-full flex items-center pt-10 justify-center px-2 400px:px-5 pb-20">
          <div className=" w-full md:w-8/12 lg:w-6/12 py-10 gap-5 rounded-lg bg-white shadow-2xl flex flex-col items-center justify-center">
            <Lottie
              animationData={CheckSuccess}
              className="w-[4.4cm]"
              loop={false}
            />
            <h2 className="font-bold text-wine_primary text-[20px] w-10/12 text-center">
              Congratulations! Your account activation is complete.
            </h2>
            <p className="w-10/12 text-center mt-2">
              We're excited to have you as part of our community. You can now
              enjoy a seamless shopping experience.
            </p>
            <p className="underline font-semibold">
              Redirecting in 3 seconds...
            </p>
          </div>
        </div>
      </>
    );
  }

  return <>{content}</>;
}

export default Activation;
