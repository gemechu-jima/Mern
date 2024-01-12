import {Form, redirect, useOutletContext} from "react-router-dom"
import { FormRow, FormSelect, SubmitBtn } from "../Components"
import  Wrapper from "../assets/wrappers/DashboardFormPage"
import {JOB_STATUS, JOB_TYPE, JOB_SORT_BY} from "../../../utils/constant"
import { toast } from "react-toastify"
import CustomAxios from "../utils/CustomAxios"
function AddJob() {
 
  return (
    <Wrapper>
     <Form method="post" className="form">
      <h1 className="form-title">Add Job</h1>
      <div className="form-center">
      <FormRow type="text" name="compancy" label="Compancy" defaultValue=""/>
      <FormRow type="text" name="position" label="Position" defaultValue=""/>
      <FormRow type="text" name="jobLocation" label="Job Location" defaultValue=""/>
      <FormSelect name="jobStatus" label="Job Status" defaultValue={JOB_STATUS.PENDING}
       list={Object.values(JOB_STATUS)}/>
      <FormSelect name="jobType" label="Job Type" defaultValue={JOB_TYPE.FULL_TIME}
       list={Object.values(JOB_TYPE)}/>
      <SubmitBtn formBtn/>
      </div>
     </Form>
    </Wrapper>
  
  )
}

export default AddJob;

export const Action=async({request})=>{
const formData=await request.formData()
const data=Object.fromEntries(formData)

try {
  await CustomAxios.post("/jobs", data)
  toast.success("Job is Succesfully add")
  return redirect("all-jobs")
} catch (error) {
  toast.error(error?.response?.data?.msg)
  return error
}
}
