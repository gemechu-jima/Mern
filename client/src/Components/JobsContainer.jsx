import Jobs from "./Jobs"
import {useAlljobsContext} from "../pages/AllJobs"
import Wrapper from "../assets/wrappers/JobsContainer";
function JobsContainer() {
const {jobs}=useAlljobsContext()
  if(jobs.length===0) 
  return (
   <Wrapper>
    <p> No job exist</p>
   </Wrapper>
    )
  return (
    <Wrapper>
       <div className="jobs">
        {jobs.map(job=>{
          return  <Jobs key={job._id} {...job}/>
        })}
      
       </div>
    </Wrapper>
  )
}

export default JobsContainer