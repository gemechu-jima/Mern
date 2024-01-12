import { Link ,Form, redirect, } from "react-router-dom";
import {toast} from "react-toastify"
import { FormRow, Logo , SubmitBtn} from "../Components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import CustomAxios from "../utils/CustomAxios";

function Register() {

  return (
    <Wrapper>
      <Form method="post" className="form"  >
        <Logo />
        <h4>Regsiter</h4>
        <FormRow
          type="text"
          name="name"
          label="First Name"
          defaultValue="one"
          required
        />
        <FormRow
          type="text"
          name="lastName"
          label="lastname"
          defaultValue="two"
          required
        />
        <FormRow
          type="email"
          name="email"
          label="Email"
          defaultValue="one@gmail.com"
          required
        />
        <FormRow
          type="text"
          name="location"
          label="Location"
          defaultValue="Addis"
          required
        />
        <FormRow
          type="password"
          name="password"
          label="Password"
          defaultValue="QWmern123!"
          required
        />
        

        <SubmitBtn />
        <p>
          Aready Memeber  <Link to="/login" className="member-btn">login</Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default Register;
export const Action=async({request})=>{

  const formData=await request.formData()
  const data=Object.fromEntries(formData)
  try {
   await CustomAxios.post("/users/register", data)
   toast.success("Registaraion  successfully")
    return redirect("/login")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error;
  }
}