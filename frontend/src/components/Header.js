"use client";
import { useState } from "react";
import Link from "next/link";
import { HOME_ROUTE, LOGIN_ROUTE, SIGN_UP_ROUTE } from "../constants/routes";
import navlinks from "@/constants/navlinks";
import { WiDaySunny } from "react-icons/wi";
import { GiNightSky } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/userPreference/userPreferencesSlice";
import { FaUser } from "react-icons/fa";
import User from "./User";
import logo from "../../public/logo.png";
import Image from "next/image";
import CartTotal from "./CartTotal.js";

const Header = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const user = state.auth?.user?.userData
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  const toggleMode = () => {
    dispatch(toggleTheme());
  };
  return (
    <header className="shadow-md dark:bg-[#330d57] dark:text-gray light:bg-gray-200 tracking-wide z-50 !sticky top-0">
      <section className="flex items-center lg:justify-between flex-wrap gap-5 relative py-3 sm:px-10 px-4 border-b border-gray-300 lg:min-h-[75px] max-lg:min-h-[60px]">
        <div className="space-x-4 flex items-center">
          <div className="w-7 h-7 flex items-center justify-center rounded-md dark:text-gray text-gray-800 hover:bg-primary hover:text-white transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer w-5 h-5 fill-current transition-all"
              viewBox="0 0 155.139 155.139"
            >
              <path
                d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
                data-original="#010002"
              />
            </svg>
          </div>
          <div className="w-7 h-7 flex items-center justify-center rounded-md dark:text-gray text-gray-800 hover:bg-primary hover:text-white transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer w-5 h-5 fill-current transition-all"
              viewBox="0 0 24 24"
            >
              <path
                d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"
                data-original="#000000"
              />
            </svg>
          </div>
          <div className="w-7 h-7 flex items-center justify-center rounded-md dark:text-gray text-gray-800 hover:bg-primary hover:text-white transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer w-5 h-5 fill-current transition-all"
              viewBox="0 0 1226.37 1226.37"
            >
              <path
                d="M727.348 519.284 1174.075 0h-105.86L680.322 450.887 370.513 0H13.185l468.492 681.821L13.185 1226.37h105.866l409.625-476.152 327.181 476.152h357.328L727.322 519.284zM582.35 687.828l-47.468-67.894-377.686-540.24H319.8l304.797 435.991 47.468 67.894 396.2 566.721H905.661L582.35 687.854z"
                data-original="#000000"
              />
            </svg>
          </div>
        </div>

        <Link href={HOME_ROUTE}>
          <Image
            // src="https://readymadeui.com/readymadeui.svg"
            src={logo}
            alt="logo"
            className="md:w-[50px] w-[50x] rounded-full"
            height={50}
            width={50}
          />
        </Link>

        <div className="flex items-center gap-2">
          {state.auth?.user?.userData ? (
            <div className="relative flex justify-center items-center gap-2">
              <h4>{user?.userName}</h4>
              <button
                onClick={() => setShow(!show)}
                className="cursor-pointer border-2 rounded-full h-9 w-9 flex justify-center items-center hover:bg-primary light:hover:text-white"
              >
                {(user?.profileImage)
                  ?
                  <Image
                    alt={`${user?.userName}'s profile image`}
                    src={user.profileImage}
                    height={50}
                    width={50}
                    className="md:w-[50px] w-[50x] rounded-full text-[8px] overflow-hidden"
                  />
                  :
                  <FaUser />
                }
              </button>
              {show && <User userEmail={user?.userEmail} setShow={setShow} />}
            </div>
          ) : (
            <>
              <Link
                href={LOGIN_ROUTE}
                className="font-medium text-[15px] border-0 outline-0 cursor-pointer dark:text-gray hover:underline"
              >
                Login
              </Link>

              <Link
                href={SIGN_UP_ROUTE}
                className="w-full bg-gradient-to-tl  via-[#5a00a3] via-[8%] to-black px-4 py-2 text-sm rounded-xs font-medium dark:text-gray dark:hover:text-white text-white border border-primary bg-primary hover:bg-primary cursor-pointer"
              >
                Sign up
              </Link>
            </>
          )}
          <button id="toggleOpen" className="lg:hidden cursor-pointer">
            <svg
              className="w-7 h-7"
              fill="#333"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </section>

      <div className="flex max-w-screen-xl mx-auto w-full relative py-1.5">
        <div className="flex flex-wrap items-center lg:gap-y-2 gap-4 w-full">
          <div
            id="collapseMenu"
            className="lg:ml-6 h-full place-content-center max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
          >
            <button
              id="toggleClose"
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 fill-black"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>

            <ul className="h-full lg:place-items-center lg:flex lg:gap-x-3 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:shadow-md max-lg:overflow-auto z-50">
              <li
                className="transition-all lg:h-full cursor-pointer place-content-center border-b  border-primary  hover:text-white hover:bg-primary hover:rounded-xs py-3 px-3 max-lg:relative"
                onMouseEnter={() => setToggle(true)}
              >
                Shop
                {toggle && (
                  <div
                    onMouseLeave={() => setToggle(false)}
                    id="mega-menu"
                    className="w-full absolute shadow-lg dark:bg-[#330d57]  bg-white px-6 py-8 top-16 right-0 left-0 z-50"
                  >
                    <div className="max-w-screen-xl mx-auto flex max-lg:flex-col gap-x-12 gap-y-6">
                      <div className="grid lg:grid-cols-4 gap-6 w-full">
                        <div>
                          <h6 className="dark:text-primary text-slate-900 text-base font-semibold mb-4 ">
                            Men's Fashion
                          </h6>
                          <ul className="space-y-4">
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                T-Shirts
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Shirts
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Jeans
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Shoes
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Jackets
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Watches
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h6 className="dark:text-primary text-slate-900 text-base font-semibold mb-4">
                            Women's Fashion
                          </h6>
                          <ul className="space-y-4">
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Dresses
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Tops & Blouses
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Handbags
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Heels
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Skirts
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Jewelry
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h6 className="dark:text-primary text-slate-900 text-base font-semibold mb-4">
                            Electronics
                          </h6>
                          <ul className="space-y-4">
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Smartphones
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Laptops
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Smart Watches
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Headphones
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Cameras
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Accessories
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h6 className="dark:text-primary text-slate-900 text-base font-semibold mb-4">
                            Home & Living
                          </h6>
                          <ul className="space-y-4">
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Furniture
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Lighting
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Decor
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Kitchenware
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Bedding
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="javascript:void(0)"
                                className="dark:text-gray text-slate-500 text-base dark:hover:text-primary hover:text-slate-900 text-sm font-medium"
                              >
                                Storage
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="max-w-sm max-[1200px]:max-w-xs w-full aspect-[6/3]">
                        <img
                          src="https://readymadeui.com/images/digital-img-5.webp"
                          alt="product-img"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
              {navlinks.map((navlink, index) => (
                <Link
                  onMouseEnter={() => setToggle(false)}
                  key={index}
                  href={navlink.route}
                  className={`dark:text-gray text-slate-600 hover:text-primary text-[15px] block font-medium`}
                >
                  {navlink.label}
                </Link>
              ))}
            </ul>
          </div>

          <div className="ml-auto flex items-center justify-center gap-2">
            <CartTotal />
            <div className="flex items-center cursor-pointer border-none rounded-full shadow hover:shadow-purple-600">
              {state.userPreferences.theme == "dark" ? (
                <WiDaySunny onClick={toggleMode} className="w-6 h-6" />
              ) : (
                <GiNightSky onClick={toggleMode} className="w-6  h-6" />
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;

{
  /* <div className="flex flex-wrap py-3.5 px-10 overflow-x-auto">

        <div id="collapseMenu"
          className="w-full max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
          <button id="toggleClose" className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"></path>
            </svg>
          </button>

          <ul
            className="lg:flex lg:justify-center lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <Link href="javascript:void(0)"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><Link href='javascript:void(0)'
              className="hover:text-blue-700 text-blue-700 font-medium text-[15px] block">Home</Link></li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><Link href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">Team</Link></li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><Link href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">Feature</Link></li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><Link href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">Blog</Link></li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><Link href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">About</Link></li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><Link href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">Contact</Link></li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><Link href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">Source</Link></li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><Link href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">Store</Link></li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><Link href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">Fashion</Link></li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><Link href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">Partner</Link></li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3"><Link href='javascript:void(0)'
              className="hover:text-blue-700 text-slate-900 font-medium text-[15px] block">More</Link></li>
          </ul>
        </div>

        <div className="flex ml-auto lg:hidden">
          <button id="toggleOpen" className="cursor-pointer">
            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div> */
}
