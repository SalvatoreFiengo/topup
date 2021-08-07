import { FC, useState } from 'react';
import styled from 'styled-components';
import InfoComponent from './infoComponent';

type CountriesSelectType = {
    data:any;
    isCountryInfo: boolean;
    handleCountrySelection:(country:any)=>void;
    toggleCountrySelection:()=>void;
    countryName: string;
};
const CountrySelectComponent:FC<CountriesSelectType> = ({data, isCountryInfo, handleCountrySelection, countryName,toggleCountrySelection}) =>{
    const [search, updateSearch] = useState("");
    
    const hanldeSearch = (event: React.FormEvent<HTMLInputElement>)=>{
        updateSearch(event.currentTarget.value)    
    };

    return(
        <CountrySelect>
            {isCountryInfo===false?<h2>Who would you like to top-up?</h2>:<h2>Summary</h2>}
            {isCountryInfo===false?
            <>
                <label >Search country
                    <input type="text" placeholder="Begin Search" value={search} onChange={hanldeSearch}/>
                </label>
                {
                search!==""?
                    data.countries
                        .filter((country:any)=>country.name.toLowerCase().includes(search.toLowerCase()))
                        .map((country:any)=>{
                            return(
                                <div className="list-item" key={country.iso} onClick={()=>handleCountrySelection(country)}>
                                    <p>(+{country.prefix})-{country.name}</p>
                                </div>
                                )})
                            :null
                }
            </>
            :
            <InfoComponent label="Country" name={countryName} toggleFunc={toggleCountrySelection}/>

            }
            
        </CountrySelect>
    );
};
const CountrySelect = styled.div`
    h2{
        text-align: center;
    }
    input[type="text"]{
        margin: 0.5em 0 2em 0;
        border: 1px solid rgb(112, 140, 140);
        border-radius: 8px;
        height: 48px;
        display: block;
        width: 100%;
        color: rgb(0, 74, 89);
        padding: 0px 16px;
        box-sizing: border-box;
        &:focus { 
            box-shadow: rgb(203 242 0) 0px 0px 2px 2px;
            outline: none;
        }
    } 
    div.list-item{
        width: 100%;
        height: 56px;
        text-align: center;
        border: 1px solid rgb(112, 140, 140);
        border-radius: 8px;
        margin: 0 auto;
        margin-bottom: 0.2rem;
        cursor: pointer;
        p{
            line-height: 1.5;
        }
        &:hover{
            box-shadow: rgb(203 242 0) 0px 0px 2px 2px;
        }
    }
`;

export default CountrySelectComponent;