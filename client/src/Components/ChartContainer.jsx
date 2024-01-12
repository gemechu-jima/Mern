
import { useState } from "react"
import AreaChart from "./AreaChart"
import Barchart from "./Barchart"
import Wrapper from "../assets/wrappers/ChartsContainer"
function ChartContainer({data}) {
    const[barchart, setBarChart]=useState(true)
  return (
    <Wrapper>
      <h4>Montly Applications</h4>
       <button type="button" onClick={()=>setBarChart(!barchart)}> {barchart? "AreaChart":"BarChart"}</button>
        {barchart?
            <Barchart data={data}/>:
            <AreaChart data={data}/>
        }
    </Wrapper>
  )
}

export default ChartContainer