
import './Clear.css'
import { MdDelete } from "react-icons/md";
import axios from "axios";


function clearLogs() {
    return axios.post("/api/v1/clear")
}
function Clear() {
    function clearOnClick() {
        const accept = window.confirm("Delete all logs?");
        if(accept) {
            clearLogs().catch(e => console.error(e))
        }
    }

    return (
        <div className={"center"}>
            <button onClick={clearOnClick} className={"clean-button"} type="button"><MdDelete/></button>
        </div>
    )
}

export default Clear;