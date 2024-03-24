import {ReactElement} from "react";
import CSV, {CSVProps} from "../csv/CSV";
import Clear from "../clear/Clear";
import './TopButtons.css'

type TopButtonsProps = CSVProps

function TopButtons(props: TopButtonsProps): ReactElement {
    return <div className={"top-buttons-container center"}>
        <CSV messages={props.messages}/>
        <Clear/>
    </div>
}

export default TopButtons;