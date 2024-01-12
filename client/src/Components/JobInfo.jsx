
import Wrapper from "../assets/wrappers/JobInfo"
function JobInfo({icon, text}) {
  return (
    <Wrapper>
        <span>{icon}</span>
        <span>{text}</span>
    </Wrapper>
  )
}

export default JobInfo