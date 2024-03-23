import './Table.css'
import { Message } from '../../types'
import { messageBodyAsString } from '../../App';
import Highlighter from "react-highlight-words";


function Table({ messages, words }: { messages: Message[], words: string[] }) {
    return <table>
        <tbody>
            <tr>
                <th style={{ width: "20%" }}>Date</th>
                <th>Message</th>
            </tr>
            {messages.map((msg, i) => (
                <tr key={i}>
                    <td>{msg.date.toString()}</td>
                    <td>{
                        <Highlighter searchWords={words}
                                     textToHighlight={messageBodyAsString(msg)}
                                     autoEscape={true}
                        />
                    }</td>
                </tr>
            ))}
        </tbody>
    </table>
}

export default Table;