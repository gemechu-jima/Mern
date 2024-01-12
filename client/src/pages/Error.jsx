import { useRouteError } from "react-router-dom"
import NotFound from "../assets/images/not-found.svg"
import Wrapper from "../assets/wrappers/ErrorPage"
function Error() {
  const error=useRouteError()
  if(error.statusText===  "Not Found")
  return (<Wrapper>
       <img src={NotFound} />
       <h3> ohh page is not found </h3>
  </Wrapper>
          )
  return (
    <Wrapper>
      {error.data}
    </Wrapper>
  )
}

export default Error