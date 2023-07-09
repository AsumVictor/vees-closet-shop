import React from "react";
import { InputLabel, CheckboxLabel, Button } from "../components/Inputs";
import LoginPanel from "../components/LoginPanel";
function Login() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
      <div className="py-3 w-full order-1 lg:order-2 flex flex-col justify-center items-center h-screen">
        <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-wine_primary capitalize text-center">
            Customer login
          </h4>
         <p className="text-center">We're excited to welcome you</p>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <InputLabel
                label={"Email"}
                type={"email"}
                handleChange={() => {
                  console.log("d");
                }}
                name={"userEmail"}
              />
              <InputLabel
                label={"Password"}
                type={"password"}
                handleChange={() => {
                  console.log("d");
                }}
                name={"userPassword"}
              />
            </div>
            <div className="grid w-full grid-cols-2">
              <div className="flex items-center">
                <CheckboxLabel />
                Remember me
              </div>
              <div className="flex items-center justify-end">
              <a
                className="font-medium text-wine_primary transition-colors hover:text-blue-700"
                href="#"
              >
                Forget password
              </a>
              </div>
            </div>
            <Button classname={"mt-6 bg-wine_primary w-full "}>Login</Button>
            <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              I don't have an account?
              <a
                className="font-medium text-wine_primary transition-colors hover:text-blue-700"
                href="#"
              >
                Create account
              </a>
            </p>
          </form>
        </div>
      </div>
      <div className="py-3 w-full order-1 lg:order-1 h-full bg-gray-200 px-10">
        <LoginPanel />
          
      </div>
    </div>
  );
}

export default Login;
