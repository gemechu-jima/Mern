import { Link , Form ,  redirect, useActionData, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { FormRow, Logo, SubmitBtn } from "../Components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import CustomAxios from "../utils/CustomAxios";


function Login() {
  const errors=useActionData()
  const navigate=useNavigate()
  const loginDemouser=async()=>{
    const data={
      email: 'test@test.com',
      password: 'Secret123!',
    }
    try {
      await CustomAxios.post("/users/login", data)
      toast.success("take demo login")
      navigate("/dashboard")
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo/>
        <h4>Login</h4>
        {errors? <p style={{color:"red"}}>{errors.msg}</p> :<></>}
        <FormRow
          type="email"
          name="email"
          label="Email"
          defaultValue="one@gmail.com"
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
           <button type="button" className="btn btn-block" onClick={loginDemouser}>Expore Demo app</button>
        <p>
          if not a Memeber yet ?  <Link to="/register" className="member-btn">register</Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export default Login;

export const Action=async({request})=>{
const formData=await request.formData();
const data= Object.fromEntries(formData);
const errors={msg:""}
if(data.password.length<3){
  errors.msg="Please strong your password"
  return errors
}
try {
  await CustomAxios.post("/users/login", data)
  toast.success("login successfuly")
  return redirect("/dashboard")
} catch (error) {
  // toast.error(error?.response?.data?.msg)
  errors.msg=error?.response?.data?.msg
  return errors  
}
}
