import './Table.css'
import { Message } from '../../types'
import { messageBodyAsString } from '../../App';


function Table({ messages }: { messages: Message[] }) {
    return <table>
        <tbody>
            <tr>
                <th style={{ width: "20%" }}>Date</th>
                <th>Message</th>
            </tr>
            {messages.map((msg, i) => (
                <tr key={i}>
                    <td>{msg.date.toString()}</td>
                    <td>{messageBodyAsString(msg)}</td>
                </tr>
            ))}
        </tbody>
    </table>
}

export default Table;