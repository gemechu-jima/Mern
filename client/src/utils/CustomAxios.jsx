
import axios from "axios"

const CustomAxios=axios.create({
    baseURL:"/api/v1"
})
export default CustomAxios;