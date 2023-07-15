import {Link, useLocation} from "react-router-dom";
import Lottie from 'lottie-react'
import CheckSuccess from '../assets/Animation/emailConfirmation.json'
import {HiChevronDoubleRight} from 'react-icons/hi'

function SignupSuccessPage() {
  const location = useLocation()
  const {email} = location.state
  return (
    <div className="w-full flex items-center pt-10 justify-center px-2 400px:px-5">
      <div className=" w-full md:w-8/12 lg:w-6/12 py-10 gap-5 rounded-lg bg-white shadow-2xl flex flex-col items-center justify-center">
        <Lottie animationData={CheckSuccess} className="w-[4cm]" loop={false}/>
        <h2 className="font-bold text-wine_primary text-[20px] w-10/12 text-center">Congratulations! You're now signed up.</h2>
        <p className="w-10/12 text-center mt-2"> Please check your email, <span className="font-bold ">{email}</span>, and click on the confirmation link we've sent you. </p>
        <Link to='/' className="px-2 underline text-navy_blue flex flex-row items-center font-bold ">Continue shopping <HiChevronDoubleRight /></Link>
      </div>
    </div>
  );
}

export default SignupSuccessPage;
