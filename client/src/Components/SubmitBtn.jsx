import { useNavigation } from "react-router-dom"

function SubmitBtn({formBtn}) {
    const navigation= useNavigation()
const iSubmitting=navigation.state==="submitting"
  return (
    <button className={`btn btn-block ${formBtn && "form-btn"}`}
        disabled={iSubmitting}>
        {iSubmitting? "Submitting":"submit"}
    </button>
  )
}

export default SubmitBtn