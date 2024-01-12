import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AddJob, Admin, AppLayout, DashboardLayout, Landing, Login, Register, AllJobs, Stats, Profile, EditJob } from "./pages"
import {Action as RegisterAction} from "./pages/Register"
import {Action as LoginAction} from "./pages/Login"
import {Loader as DashboardLoader } from "./pages/DashboardLayout"
import {Action as AddjobAction} from "./pages/AddJob"
import {Loader as AlljobLoader} from "./pages/AllJobs"
import {Loader as EditjobLoader} from "./pages/EditJob"
import {Action as EditjobAction} from "./pages/EditJob"
import {Action as DeletejobAction} from "./pages/DeleteJob"
import {Loader as AdminjobLoader} from "./pages/Admin"
import {Action as ProfileAction} from "./pages/Profile"
import {Loader as StatsLoader} from "./pages/Stats"
import Error from "./pages/Error"
const checkDefaultTheme = () => {
  const isDarkTheme =localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};
const darkThemeEnabled=checkDefaultTheme()
const router=createBrowserRouter([
{
  path:"/",
  element:<AppLayout/>,
  errorElement:<Error/>,
  children:[
    {
      index:true,
      element:<Landing/>
    },
    {
      path:"login",
      element:<Login/>,
      action:LoginAction
    },
    {
      path:"register",
      element:<Register/>,
      action:RegisterAction
    
    },
    {
      path:"dashboard",
      element:<DashboardLayout  darkThemeEnabled={ darkThemeEnabled} />,
      loader:DashboardLoader,
      children:[
        {
        index:true,
        element:<AddJob/>,
        action:AddjobAction
        },
        {
          path:"all-jobs",
          element:<AllJobs/>,
          loader:AlljobLoader
        },
        {
          path:"Stats",
          element:<Stats/>,
          loader:StatsLoader,
        },
        {
          path:"profile",
          element:<Profile/>,
          action:ProfileAction
        },
        {
          path:"admin",
          element:<Admin/>,
          loader:AdminjobLoader,
        },
        {
          path:"edit-job/:id",
          element:<EditJob/>,
          loader:EditjobLoader,
          action:EditjobAction
        },
        {
          path:"delete-job/:id",
          action:DeletejobAction,
        }
      ]
    }
  ]
}
])

function App() {
return<RouterProvider router={router}/>
}
export default App
