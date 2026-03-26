"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { HOME_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";

const AuthLayout = ({children}) => {
  const {user} = useSelector(state => state.auth);
  const router = useRouter()

  useEffect(()=>{
    if(user) router.push(HOME_ROUTE)
  },[user])
  return (
    <div className="">{children}</div> 
  )
}

export default AuthLayout