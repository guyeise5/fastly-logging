import {ReactElement} from "react";
import {Message} from "../../types";
import {CSVLink} from "react-csv";
import {FaFileCsv} from "react-icons/fa6";
import {LabelKeyObject} from "react-csv/lib/core";

export type CSVProps = {
    messages: Message[]
}

const headers: LabelKeyObject[] = [
    {label: "Date", key: "date"},
    {label: "Message", key: "message"},
];


function CSV(props: CSVProps): ReactElement {
    return <div className={"center"}>
        <CSVLink filename={"logMessages.csv"}
                 data={props.messages}
                 headers={headers}
                 enclosingCharacter={""}
        >
            <button className={"top-button"}><FaFileCsv color={"green"}/></button>
        </CSVLink>
    </div>
}

export default CSV;