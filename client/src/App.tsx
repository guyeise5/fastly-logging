import './App.css';
import Table from './components/table/Table'
import Search from './components/search/Search';
import { useEffect, useState } from "react";
import {Message} from './types'
import axios from 'axios';

function App() {
  const [filter, setFilter] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const messages = await fetchMessages()
      setMessages(messages)
    }, 1000)
    return () => clearInterval(interval)
  })
  
  return (
    <div className='center'>
      <Search updateFilter={setFilter} />
      <Table messages={filterMessages(messages, filter)}/>
    </div>
  );
}

async function fetchMessages(): Promise<Message[]> {
  const response = await axios.get<Message[]>("http://localhost:8080/api/v1/log", { timeout: 1000 });
  return response.data;
}

function filterMessages(messages: Message[], filter: string): Message[] {
  return messages.filter(msg => filter?.split(' ')?.every(f => msg.message.includes(f)))
}

export default App;
