import {Form, Link,useSubmit } from "react-router-dom"
import {JOB_STATUS, JOB_TYPE, JOB_SORT_BY} from "../../../utils/constant"
import {FormRow, FormSelect, SubmitBtn} from "."
import { useAlljobsContext } from "../pages/AllJobs"
import Wrapper from "../assets/wrappers/DashboardFormPage"

function SearchContainer() {
  const data=useAlljobsContext()
  const {search, jobStatus, jobType, jobSort}=data
  const submit=useSubmit()
 
  return (
    <Wrapper>
      <Form className="form">
      <h4 className="form-title">Search</h4>
      <div className="form-center">
        <FormRow type="search" name="search" defaultValue={search} onChange={(e) => {
              submit(e.currentTarget.form);
            }}/>
        <FormSelect name="jobStatus" label="Job Status" defaultValue={jobStatus} onChange={(ev)=>submit(ev.currentTarget.form)}
         list={["all",...Object.values(JOB_STATUS)]}/>
          <FormSelect name="jobType" label="Job Type" defaultValue={jobType} onChange={(ev)=>submit(ev.currentTarget.form)}
         list={["all",...Object.values(JOB_TYPE)]}/>
          <FormSelect name="jobSort" label="Job Sort" defaultValue={jobSort} onChange={(ev)=>submit(ev.currentTarget.form)}
         list={[...Object.values(JOB_SORT_BY)]}/>
         <Link to="/dashboard/all-jobs" className='btn form-btn delete-btn'
         onClick={() => window.location.reload()}
         >
          Reset Search Values</Link>
        
      </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer