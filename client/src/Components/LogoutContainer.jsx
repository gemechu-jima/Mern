import { IoMdLogOut,IoMdArrowDropdown } from "react-icons/io";

import Wrapper from "../assets/wrappers/LogoutContainer"
import { useDashboardContext } from "../pages/DashboardLayout"
import { useState } from "react";
function LogoutContainer() {
    const {user, Logout}=useDashboardContext()
    const [showLogout, setLogout]=useState(false)
  return (
    <Wrapper>
      <button type="button" className="logout-btn btn"
       onClick={()=>setLogout(showLogout=>!showLogout)}>
        {user.avatar?
        <img src={user.avatar} alt='avatar' className='img' /> :
         <IoMdLogOut/>}
        {user.name}
        <IoMdArrowDropdown/>
        </button>
        <div
         className={showLogout? 
         "dropdown show-dropdown" :
         "dropdown"}>
          <button type="button" className="dropdown-btn" onClick={Logout}>
          Logout
          </button>
        </div>
    </Wrapper>
  )
}

export default LogoutContainer