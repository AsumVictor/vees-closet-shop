import Logo from '../assets/vite.svg'
import Lottie from "lottie-react";
import ShopingAnim from '../assets/Animation/veesLogin.json'

function LoginPanel() {
  return (
    <div className='w-full '>
        <div className="flex flex-row gap-3">
        <img src={Logo} alt="" />
<h1 className='text-3xl font-bold text-wine_primary'>Vees</h1>
        </div>
        <h2 className='mt-10 font-bold text-2xl'>Welcome back!</h2>
        <p className=''>Please login into your account</p>
        <Lottie
          animationData={ShopingAnim}
          loop={true}
         className='w-full md:w-10/12 mt-10'
          autoplay={true}
          speed={30}
        />
    </div>
  )
}

export default LoginPanel