import { redirect, useLoaderData } from "react-router-dom";
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import CustomAxios from "../utils/CustomAxios";
import Wrapper from "../assets/wrappers/StatsContainer";
import StateItem from "../Components/StateItem";
function Admin() {
  const { job, user } = useLoaderData();

  return (
    <Wrapper>
      <StateItem
        title="current Users"
        count={user}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling/>}
      />
      <StateItem
        title="Total Jobs"
        count={job}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck/>}
      />
    </Wrapper>
  );
}

export default Admin;

export const Loader = async () => {
  try {
    const response = await CustomAxios.get("/auth/admin/app/stats");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard");
  }
};
