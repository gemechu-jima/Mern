import {Links} from "../utils/Links"
import { NavLink } from "react-router-dom"
import {  useDashboardContext } from "../pages/DashboardLayout";

function NavLinks({isBigSidebar}){
    const { SidebarToggle, user}= useDashboardContext()
    const {role}=user
    return <nav className="nav-links">
    {Links.map((link)=>{
        if(link.path==="admin" && role!=="admin") return;

    return( <NavLink 
     to={link.path} 
     key={link.label} 
     className="nav-link"
     onClick={isBigSidebar? null :SidebarToggle}
     end
     >
     <span className="icon">{link.icon} </span> {link.label}
     </NavLink>)
})}
   </nav>
}
export default NavLinks;