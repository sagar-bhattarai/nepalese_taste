"use client";

import Image from "next/image";
import loginBg from "../../../../public/purple.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signUp } from "@/apis/auth.api";

import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "@/redux/auth/authActions";
import { FaSpinner } from "react-icons/fa";
import { useEffect } from "react";
import { toast } from "react-toastify";
import PasswordInput from "@/components/PasswordInput";

const registerPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(state => state.auth);

  useEffect(()=>{
    if(error){
      toast.error(error?.message);
    }
  },[error]);

  const submitForm = (data) => {
    dispatch(signUpUser(data));
  };

  return (
    <div className="flex min-h-full justify-center items-center ">
      <div className="flex justify-center items-center ">
        <section className="pt-2 mb-10 ">
          <div className="flex flex-col justify-center items-center">
            {/* <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=purple&shade=700" alt="Your Company" className="mx-auto h-10 w-auto" /> */}
            <Image
              src={loginBg}
              height={100}
              width={200}
              alt="login"
              className=""
            />
          </div>

          <div className="shadow-md p-10  dark:bg-[#0e041a] light:bg-[#f8f8ff] rounded-md">
            <h2 className="mb-10 text-center text-2xl/9 font-bold tracking-tight dark:text-gray-600 light:text-dark">
              Sign up your account
            </h2>
            <form
              onSubmit={handleSubmit(submitForm)}
              action="#"
              method="POST"
              className="space-y-6 "
            >
              <div className="flex items-center justify-center gap-5">
                <div >
                  <label
                    htmlFor="name"
                    className="block text-sm/6 font-medium text-gray-600"
                  >
                    Name
                  </label>
                  <div className="mt-2 min-w-80">
                    <input
                      id="name"
                      type="name"
                       placeholder="Enter your name"
                      {...register("userName")}
                      required
                      autoComplete="name"
                      className="dark:text-gray-600 light:text-dark block w-full border dark:border-gray light:border-gray-300 rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-500 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-600"
                  >
                    Email address
                  </label>
                  <div className="mt-2 min-w-80">
                    <input
                      id="email"
                      type="email"
                      placeholder="youremail@mail.com"
                      {...register("userEmail")}
                      required
                      autoComplete="email"
                      className="dark:text-gray-600 light:text-dark block w-full border dark:border-gray light:border-gray-300 rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-500 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5">
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-600"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2 min-w-80">
                    <PasswordInput placeholder="Enter your password" id="password" {...register("userPassword")}/>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirm_password"
                      className="block text-sm/6 font-medium text-gray-600"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2 min-w-80">
                    <PasswordInput placeholder="Re-type your password" id="confirm_password" {...register("confirmPassword")}/>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5">
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="phone"
                      className="block text-sm/6 font-medium text-gray-600"
                    >
                      Phone Number
                    </label>
                  </div>
                  <div className="mt-2 min-w-80">
                    <input
                      id="phone"
                      type="text"
                       placeholder="Enter your phone number"
                      {...register("userPhone")}
                      required
                      autoComplete="phone"
                      className="dark:text-gray-600 light:text-dark block w-full rounded-md border dark:border-gray light:border-gray-300 bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-500 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm/6 font-medium text-gray-600"
                  >
                    Address
                  </label>
                  <div className="mt-2 min-w-80">
                    <input
                      id="address"
                      type="address"
                       placeholder="Enter your address"
                      {...register("userAddress")}
                      required
                      autoComplete="address"
                      className="dark:text-gray-600 light:text-dark block w-full border dark:border-gray light:border-gray-300 rounded-md bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-500 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="disabled:opacity-50 flex items-center justify-center gap-2 w-full rounded-md bg-primary cursor-pointer px-3 py-1.5 text-sm/6 font-semibold dark:text-black light:text-white hover:bg-purple-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                >
                  Sign Up {loading && <FaSpinner className="animate-spin"/> }
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-600">
              Already a member?
              <Link
                href="#"
                className="font-semibold text-primary hover:text-purple-400"
              >
                {" "} Sign In
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default registerPage;
