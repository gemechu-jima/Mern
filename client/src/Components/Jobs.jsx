import { MdLocationOn, MdDateRange, MdTypeSpecimen } from "react-icons/md";

import day from "dayjs"
import Wrapper from "../assets/wrappers/Job"
import JobInfo from "./JobInfo"
import { Form, Link, useNavigation } from "react-router-dom";
function Jobs({position, compancy,jobLocation, jobStatus, jobType, createdAt, _id}) {
    const date=day(createdAt).format("DD, MMM , YY")
    const navigation=useNavigation()
    const isDeleting=navigation.state="submitting"
  return (
    <Wrapper>
      <header>
        <div className="main-icon">
        {compancy.charAt(0)}
        </div>
        <div className="info">
        <h5>{compancy}</h5>
        <p>{position}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
            <JobInfo icon={<MdLocationOn/>} text={jobLocation}/>
            <JobInfo icon={<MdDateRange/>} text={date}/>
            <JobInfo icon={< MdTypeSpecimen/>} text={jobType}/>
            <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
            <Link to={`../edit-job/${_id}`} className="btn edit-btn" >
              Edit
            </Link>
            <Form method="post" action={`../delete-job/${_id}`}>
                <button type="submit" className="btn delete-btn">Delete</button>
            </Form>
        </footer>
      </div>
    </Wrapper>
  )
}
export default Jobs
