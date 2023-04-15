
import './Search.css'
import { AiOutlineSearch } from 'react-icons/ai';
function Search({ updateFilter }: { updateFilter: (arg0: string) => void }) {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search" className="search-input" onChange={(e) => updateFilter(e.target.value)} />
            <AiOutlineSearch />
        </div>
    )
}

export default Search;