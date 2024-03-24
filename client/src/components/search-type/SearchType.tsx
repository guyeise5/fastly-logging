import {ReactElement} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export type SearchOption = 'words' | 'regexp'
const options: SearchOption[] = [
    'words', 'regexp'
];

export function searchOptionFromString(str: string): SearchOption {
    return str as SearchOption
}

export type SearchTypeProps = {
    option: SearchOption,
    setOption: (newOption: SearchOption) => void
}

function SearchType(props: SearchTypeProps): ReactElement {
    return <div>
        <Dropdown options={options} onChange={option => props.setOption(searchOptionFromString(option.value))}
                  value={props.option}/>
    </div>
}

export default SearchType;