"use client"

import { useSelector } from "react-redux"

const MainLayout = ({ children }) => {
  const state = useSelector((state) => state.userPreferences);
  return <div className={`${state.theme} ${state.theme == "dark" ? "bg-darkBackground" : "bg-lightBackground"} relative`}>{children}</div>
}

export default MainLayout