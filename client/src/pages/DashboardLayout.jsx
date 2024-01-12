import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { BigSidebar, Navbar, SmallSidebar } from "../Components";
import {toast} from "react-toastify"
import Wrapper from "../assets/wrappers/Dashboard";
import CustomAxios from "../utils/CustomAxios";



const DashboardProvider = createContext();

function DashboardLayout({ darkThemeEnabled}) {
const navigate=useNavigate()
const {user}=useLoaderData()
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkmode, setDarkmode] = useState( darkThemeEnabled);
  const SidebarToggle = () => {
    setShowSidebar( !showSidebar);
    
  };
  const DarkmodeToggle = () => {
    const newDarkmode=!darkmode
    setDarkmode(newDarkmode)
    document.body.classList.toggle("dark-theme", newDarkmode)
    localStorage.setItem("darkTheme", newDarkmode)
  };
  const Logout = async() => {
    navigate("/");
    await CustomAxios.get("users/logout")
    toast.success("logout ....")
  };
 
  return (
    <DashboardProvider.Provider
      value={{ 
        user,
        showSidebar,
         darkmode, 
         SidebarToggle,
          DarkmodeToggle,
           Logout 
          }}
    >
      <Wrapper>
        <main className="dashboard">
          <BigSidebar />
          <SmallSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{user}}/>
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardProvider.Provider>
  );
}
export const useDashboardContext=()=>{
  const context=useContext(DashboardProvider)
  if(!context) return null
  return context;
}

export default DashboardLayout;

export const Loader=async()=>{
  try {
    const {data}=await CustomAxios.get("/auth/current/user")
    return data
  } catch (error) {
    return redirect("/")
  }
 
}