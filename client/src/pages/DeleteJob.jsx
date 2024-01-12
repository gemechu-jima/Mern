import { redirect } from "react-router-dom";
import CustomAxios from "../utils/CustomAxios";
import {toast} from "react-toastify"
export async function Action({params}) {
 try {
  await CustomAxios.delete(`/jobs/${params.id}`)
  toast.success("job is deleted")
 } catch (error) {
  toast.error(error?.response?.data?.msg)
  return error;
 }
 return redirect('/dashboard/all-jobs');
}

