
import {Form} from "react-router-dom"
import  {FormRow,  SubmitBtn} from "../Components"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { useOutletContext } from "react-router-dom"
import CustomAxios from "../utils/CustomAxios"
import { toast } from "react-toastify"
function Profile() {
const {user}=useOutletContext()
const {name, lastName, location, email}=user

  return (
    <Wrapper>
      <Form className="form" method="post" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
           <label htmlFor="image">
            select image less than 0.5mb
           </label>
           <input type="file" name="avatar" id="image" accept="image/*" className="form-input"/>
          </div>
          <FormRow type="text" name="name"  defaultValue={name}/>
          <FormRow type="text" name="lastName" label="Last Name"  defaultValue={lastName}/>
          <FormRow type="email" name="email"  defaultValue={email}/>
          <FormRow type="text" name="location"  defaultValue={location}/>
          <SubmitBtn formBtn/>
        </div>
      </Form>
      </Wrapper>
  )
}

export default Profile;

export const Action=async({request})=>{
  const formData=await request.formData()
  const file=formData.get("avatar")
  if(file && file.size>5000000){
    toast.error("image size graeter than 0.5 mb")
    return null
  }
 try {
  await CustomAxios.patch("/auth/update/user", formData)
  toast.success("proflie update successfully")
 } catch (error) {
  toast.error(error?.response?.data?.msg)
 }
 return null
}