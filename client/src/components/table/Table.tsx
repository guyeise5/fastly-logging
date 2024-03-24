import './Table.css'
import {Message} from '../../types'
import {messageBodyAsString, toRegExp} from '../../App';
import Highlighter from "react-highlight-words";


type TableProps = {
    messages: Message[],
    filter: {
        text: string,
        option: string
    }
}

function Table(props: TableProps) {
    const searchWords = props.filter.option === 'regexp' ?
        [toRegExp(props.filter.text)] : props.filter.text.split(' ')
    return <table>
        <tbody>
        <tr>
            <th style={{width: "20%"}}>Date</th>
            <th>Message</th>
        </tr>
        {props.messages.map((msg, i) => (
            <tr key={i}>
                <td>{msg.date.toString()}</td>
                <td>{
                    <Highlighter searchWords={searchWords}
                                 textToHighlight={messageBodyAsString(msg)}
                                 autoEscape={props.filter.option !== "regexp"}
                                 caseSensitive={true}
                    />
                }</td>
            </tr>
        ))}
        </tbody>
    </table>
}

export default Table;