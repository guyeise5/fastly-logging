import './App.css';
import Table from './components/table/Table'
import Search from './components/search/Search';
import { useEffect, useState } from "react";
import { Message } from './types'
import axios from 'axios';
import Clear from "./components/clear/Clear";

function App() {
  const [filter, setFilter] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const messages = await fetchMessages()
        setMessages(messages)
      } catch(error) {
        console.error("failed to fetch logs", error)
      }
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <div>
      <Search updateFilter={setFilter} />
      <Clear/>
      <Table messages={filterMessages(messages, filter)} />
    </div>
  );
}

async function fetchMessages(): Promise<Message[]> {
  const url = (process.env.REACT_APP_SERVER_URL || "") + "/api/v1/log"
  const response = await axios.get<Message[]>(url, { timeout: 1000 })
  return response.data;
}

function filterMessages(messages: Message[], filter: string): Message[] {
  return messages.filter(msg => filter?.split(' ')?.every(f => messageBodyAsString(msg).includes(f)))
}

export function messageBodyAsString(message: Message): string {
  if(typeof message.message == "string") {
      return message.message;
  } else {
      return JSON.stringify(message.message, undefined, 2)
  }
}

export default App;
