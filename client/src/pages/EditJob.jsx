import { Form,  redirect, useLoaderData, useParams } from "react-router-dom"
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constant"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { FormRow,FormSelect, SubmitBtn } from "../Components"
import CustomAxios from "../utils/CustomAxios"
import { toast } from "react-toastify"

function EditJob() {
  const {job}=useLoaderData()
 
  return (
    <Wrapper>
      <Form method="post"   className="form">
      <div className="form-center">
      <FormRow type="text"  name="compancy" defaultValue={job.compancy}/>
      <FormRow type="text"  name="position" defaultValue={job.position}/>
      <FormRow type="text"  name="jobLocation" defaultValue={job.jobLocation}/>
      <FormSelect name="jobStatus"
       list={Object.values(JOB_STATUS)} defaultValue={job.jobStatus}/>
      <FormSelect name="jobType" defaultValue={job.jobType}
        list={Object.values(JOB_TYPE)}/>
      <SubmitBtn formBtn/>
      </div>
      </Form>
     
    </Wrapper>
  )
}

export default EditJob

export const Loader=async({params})=>{
  try {
   const {data}=await CustomAxios.get(`/jobs/${params.id}`)
   return data
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
export const Action =async({request, params})=>{
  
  try {

    const formData=await request.formData()
  const data=Object.fromEntries(formData)
  console.log(data)
     await CustomAxios.patch(`/jobs/${params.id}`, data)
    toast.success("succeesfuly update jobs")
    return redirect("/dashboard/all-jobs")
  } catch (error) {
    toast.error(error?.reponse?.data?.msg)
    return error
    
  }
}