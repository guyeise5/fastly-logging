import {ReactElement} from "react";
import {FaPause, FaPlay} from "react-icons/fa";
import './Pause.css'

export type PauseProps = {
    pauseClicked: () => void
    pauseMode: boolean
}

function Pause(props: PauseProps): ReactElement {
    return props.pauseMode ?
        <button onClick={props.pauseClicked} className={"play-button top-button"} type="button"><FaPlay/></button> :
        <button onClick={props.pauseClicked} className={"pause-button top-button"} type="button"><FaPause/></button>
}

export default Pause;