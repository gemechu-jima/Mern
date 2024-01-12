import { toast } from "react-toastify"
import {JobsContainer, SearchContainer} from "../Components"
import CustomAxios from "../utils/CustomAxios"
import { useLoaderData } from "react-router-dom"
import { createContext, useContext } from "react"
const AlljobContext= createContext()
function AllJobs() {
  const {data}=useLoaderData()
  
  return (
    <AlljobContext.Provider value={data}>
    <SearchContainer/>
    <JobsContainer/>
    </AlljobContext.Provider>
  )
}
export const useAlljobsContext=()=>{
  const context=useContext(AlljobContext)
  if(!context) return null;
  return context;
}
export default AllJobs
export const Loader =async({request})=>{
  
  const params=Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])
  try {
  const data=await CustomAxios.get("/jobs", {params})
  return  data
  } catch (error) {
    toast.error(error?.response?.data?.msg)
     return error
  }
  
}