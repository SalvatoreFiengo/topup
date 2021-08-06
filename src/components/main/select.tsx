import {FC, useState} from 'react';
import styled from 'styled-components';


type SelectType ={
    data: any;
}

const SelectComponent:FC<SelectType> = ({data})=>{
    const [search, updateSearch] = useState("");
    const hanldeSearch = (event: React.FormEvent<HTMLInputElement>)=>{
        updateSearch(event.currentTarget.value)
    };
    return(
        <Select>
            <input type="text" placeholder="search" value={search} onChange={hanldeSearch}/>
            {data.countries.filter((country:any)=>country.name.toLowerCase().includes(search.toLowerCase())).map((country:any, i:number)=><div key={i}>(+{country.prefix})-{country.name}</div>)}
        </Select>
    );
};
const Select = styled.div`
    div{
        max-width: 200px;
        height: 2em;
        text-align: center;
        border: 1px solid black;
        border-radius: 4px;
    }
`
export default SelectComponent;