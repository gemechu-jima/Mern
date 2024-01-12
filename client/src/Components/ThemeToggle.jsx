import { IoMdSunny } from "react-icons/io";
import { IoIosMoon } from "react-icons/io";
import { useDashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/ThemeToggle"
function ThemeToggle() {
    const {darkmode, DarkmodeToggle}=useDashboardContext()
  return (
    <Wrapper onClick={DarkmodeToggle}>
      
        {
        darkmode?
         <IoIosMoon className='toggle-icon'/> :
         <IoMdSunny className='toggle-icon'/>
     }
       
    </Wrapper>
  )
}

export default ThemeToggle