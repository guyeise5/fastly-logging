import './Search.css'
import {AiOutlineSearch} from 'react-icons/ai';
import SearchType, {SearchOption, SearchTypeProps} from "../search-type/SearchType";

type SearchProps = {
    filter: string,
    updateFilter: (arg0: string) => void
    searchTypeProps: SearchTypeProps
}

export function toSearchOption(s: string | null): SearchOption {
    switch (s) {
        case "regexp":
            return "regexp"
        default:
            return "words"
    }
}

function Search(props: SearchProps) {
    return (
        <div className="search-bar">
            <SearchType option={props.searchTypeProps.option} setOption={props.searchTypeProps.setOption}/>
            <input type="text" placeholder="Search" className="search-input" value={props.filter}
                   onChange={(e) => props.updateFilter(e.target.value)}/>
            <AiOutlineSearch/>
        </div>
    )
}

export default Search;