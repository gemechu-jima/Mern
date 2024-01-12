import { IoMdPersonAdd } from "react-icons/io";
import { MdQueryStats } from 'react-icons/md';
import { FcStatistics } from "react-icons/fc";
import { ImProfile } from "react-icons/im";
import { GiBossKey } from "react-icons/gi";

export const Links=[
    {path:".", label:"AddJob", icon:<IoMdPersonAdd/>},
    {path:"all-jobs", label:"AllJobs", icon:<MdQueryStats/>},
    {path:"stats", label:"Stats", icon:<FcStatistics/>},
    {path:"profile", label:"Profile", icon:<ImProfile/>},
    {path:"admin", label:"Admin", icon:<GiBossKey/>}
    
]