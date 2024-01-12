import Wrapper from "../assets/wrappers/SmallSidebar"
import {  useDashboardContext } from "../pages/DashboardLayout";
import { RxCross2 } from "react-icons/rx";
import NavLinks from "./NavLinks";

import Logo from "./Logo";
function SmallSidebar() {
  const {showSidebar, SidebarToggle}= useDashboardContext()
  return (
    <Wrapper>
      <div className= 
      {showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <button type="button" className="close-btn" 
          onClick={SidebarToggle}>
              <RxCross2/>
          </button>
          <header>
            <Logo/>
          </header>
          <NavLinks/>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar