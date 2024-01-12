import { useLoaderData } from "react-router-dom"
import { StatsContainer, ChartContainer } from "../Components"
import CustomAxios from "../utils/CustomAxios"

function Status() {
  const {defaultStats, monthlyApplications}=useLoaderData()
  return (
    <>
    <StatsContainer defaultStats={defaultStats}/>
    {monthlyApplications.length>1 && <ChartContainer data={monthlyApplications}/>}
    </>
  )
}

export default Status
export const Loader =async()=>{
  try {
    const response=await CustomAxios.get("/jobs/stats")
    return response.data
  } catch (error) {
    return error;
  }
}