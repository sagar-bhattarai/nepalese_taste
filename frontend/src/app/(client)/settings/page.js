"use client"
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { logout } from "@/redux/auth/authSlice";


const SetttingsPage = () => {
  const [option, setOption] = useState("Account");
  const dispatch = useDispatch();

  const optionHandle = (item) => {
    if (item.label == "Logout") {
      dispatch(logout()); return 0;
    }
    setOption(item.label)
  }

  const options = [
    { label: "Account" },
    { label: "Address Book" },
    { label: "Messages" },
    { label: "Security" },
    { label: "Ploicies" },
    { label: "Help" },
    { label: "FeedBack" },
    { label: "Logout" },
  ]


  return (
    <>
      <div className="flex gap-2">
        {options?.map((item, index) => (
          <button
            key={index}
            className={`${option == item.label ? "border-primary text-primary" : "dark:border-slate-600 dark:text-slate-400"} border  hover:text-primary hover:border-primary  cursor-pointer px-2 py-1 rounded-md text-xs`}
            onClick={() => optionHandle(item)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  )
}

export default SetttingsPage