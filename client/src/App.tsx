import './App.css';
import Table from './components/table/Table'
import Search from './components/search/Search';
import {useEffect, useState} from "react";
import {Message} from './types'
import axios from 'axios';
import Footer from "./components/footer/Footer";
import TopButtons from "./components/top-buttons/TopButtons";
import {SearchOption} from "./components/search-type/SearchType";

function App() {
  const [searchOption, setSearchOption] = useState<SearchOption>("words")
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

  const filteredMessages = filterMessages(messages, filter, searchOption);
    return (
    <div>
      <Search updateFilter={setFilter} searchTypeProps={{option: searchOption, setOption: setSearchOption}}/>
        <TopButtons messages={filteredMessages}/>
      <Table messages={filteredMessages} filter={{option: searchOption, text: filter}}/>
        <Footer/>
    </div>
  );
}

async function fetchMessages(): Promise<Message[]> {
  const url = (process.env.REACT_APP_SERVER_URL || "") + "/api/v1/log"
  const response = await axios.get<Message[]>(url, { timeout: 1000 })
  return response.data;
}

function filterMessages(messages: Message[], filter: string, searchOption: string): Message[] {
  switch (searchOption) {
    case 'words':
      return messages.filter(msg => filter?.split(' ')?.every(f => messageBodyAsString(msg).includes(f)))
    case 'regexp':
      return messages.filter(msg => toRegExp(filter).test(msg.message))
    default:
      throw new Error(`unsupported method ${searchOption}`)
  }
}

export function toRegExp(s: string): RegExp {
  try {
    return new RegExp(s);
  } catch (e) {
    // A regexp that never matches
    return /a^$/
  }
}


export function messageBodyAsString(message: Message): string {
  if(typeof message.message == "string") {
      return message.message;
  } else {
      return JSON.stringify(message.message, undefined, 2)
  }
}

export default App;
