import './Search.css'
import {AiOutlineSearch} from 'react-icons/ai';
import SearchType, {SearchTypeProps} from "../search-type/SearchType";

type SearchProps = {
    updateFilter: (arg0: string) => void
    searchTypeProps: SearchTypeProps
}

function Search(props: SearchProps) {
    return (
        <div className="search-bar">
            <SearchType option={props.searchTypeProps.option} setOption={props.searchTypeProps.setOption}/>
            <input type="text" placeholder="Search" className="search-input"
                   onChange={(e) => props.updateFilter(e.target.value)}/>
            <AiOutlineSearch/>
        </div>
    )
}

export default Search;