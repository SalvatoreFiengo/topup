import { FC, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../styles/generalStyles';
import { IcountriesSelect } from '../interfaces/interfaces';

const CountrySelectComponent:FC<IcountriesSelect> = ({data, setState, country, children}) =>{
    const [search, updateSearch] = useState("");
    
    const hanldeSearch = (event: React.FormEvent<HTMLInputElement>)=>{
        updateSearch(event.currentTarget.value)    
    };

    return(
        <CountrySelect>
            {country!==null?<h2>Summary</h2>:<h2>Who would you like to top-up?</h2>}
            {country!==null && country!==undefined?
            <>
                {children}
            </>
            :
            <>
                <label >Search country
                    <Input type="text" placeholder="Begin Search" value={search} onChange={hanldeSearch}/>
                </label>
                <div className="list-wrapper">
                {
                search!==""?
                    data.countries
                        .filter((country:any)=>country.name.toLowerCase().includes(search.toLowerCase()))
                        .map((country:any)=>{
                            return(
                                <div className="list-item" key={country.iso} onClick={()=>setState("country", country)}>
                                    <p>(+{country.prefix})-{country.name}</p>
                                </div>
                            )})
                :null
                }
                </div>
            </>
            }          
        </CountrySelect>
    );
};
const CountrySelect = styled.div`
    h2{
        text-align: center;
    }
    .list-wrapper{
        margin-top: 1rem;
        div{
            width: 100%;
            height: 56px;
            text-align: center;
            border: 1px solid rgb(112, 140, 140);
            border-radius: 8px;
            margin-bottom: 0.2rem;
            cursor: pointer;
            p{
                line-height: 1.5;
            }
            &:hover{
                box-shadow: rgb(203 242 0) 0px 0px 2px 2px;
            }
        }
    }
`;

export default CountrySelectComponent;