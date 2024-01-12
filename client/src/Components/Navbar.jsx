import Wrapper from "../assets/wrappers/Navbar"
import { FaAlignLeft } from "react-icons/fa";

import Logo from "./Logo";
import LogoutContainer from "./LogoutContainer";
import {  useDashboardContext } from "../pages/DashboardLayout";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const {  SidebarToggle}= useDashboardContext()
  return (
    <Wrapper>
      <div className="nav-center">
      <button type="button" className="toggle-btn "
       onClick={ SidebarToggle}>
          <FaAlignLeft/>
        </button>
        <div>
          <Logo/>
          <div className="logo-text">
            Dashboard
          </div>
        </div>
        <div className="btn-container">
          <ThemeToggle/>
         <LogoutContainer/>
        </div>
      </div>
        
    </Wrapper>
  )
}

export default Navbar