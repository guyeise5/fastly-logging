import {ReactElement} from "react";
import CSV, {CSVProps} from "../csv/CSV";
import Clear from "../clear/Clear";
import './TopButtons.css'
import Pause, {PauseProps} from "../pause/Pause";

type TopButtonsProps = CSVProps & PauseProps

function TopButtons(props: TopButtonsProps): ReactElement {
    return <div className={"top-buttons-container center"}>
        <CSV messages={props.messages}/>
        <Clear/>
        <Pause pauseClicked={props.pauseClicked} pauseMode={props.pauseMode}/>
    </div>
}

export default TopButtons;