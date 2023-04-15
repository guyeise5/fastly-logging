import axios from "axios";
import { useEffect, useState } from "react";
import './Table.css'

type Message = {date: Date, message: string}

function Table() {
    useEffect(() => {
        const interval = setInterval(fetchMessages(), 1000)
        return () => clearInterval(interval)
    })
    const [messages, setMessages] = useState<Message[]>([]);

    return <table>
        <tbody>
            <tr>
                <th style={{width: "20%"}}>Date</th>
                <th>Message</th>
            </tr>
            {messages.map((msg, i) => (
                <tr key={i}>
                    <td>{msg.date.toString()}</td>
                    <td>{msg.message}</td>
                </tr>
            ))}
        </tbody>
    </table>

    function fetchMessages(): () => void {
        return () => {
            axios.get<Message[]>("http://localhost:8080/api/v1/log", { timeout: 1000 })
                .then(response => {
                    setMessages(response.data)
                })
                .catch(err => console.error("failed to fetch logs from api", err));

        };
    }
}

export default Table;