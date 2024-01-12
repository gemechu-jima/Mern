import Wrapper from "../assets/wrappers/LandingPage"

import main from "../assets/images/main.svg"
import { Link } from "react-router-dom";
import {Logo} from "../Components"
function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo/>
     
      </nav>
      <div className="page">
        <div>
        <h1> Keep <span>Tracking</span> App</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum totam quo impedit odit iusto 
            illo harum alias corrupti dolores recusandae non quod consequatur dolorem provident unde placeat, 
            asperiores molestiae eveniet.
          </p>
          <Link to="/register" className="btn register-link">
             register
          </Link>
          <Link to="/login" className="btn register-link">
            login /Demo explore
          </Link>
        </div>
        <img src={main} className="main-img"/>
      </div>
        

    </Wrapper>
  )
}

export default Landing;