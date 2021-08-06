import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

type CountriesSelectType = {
    countries: any;
};
const CountriesSelect:FC<CountriesSelectType> = ({countries}) =>{
    return(
        <CountrySelect>
        
        <li><input/></li>
        {countries.map((country:any)=>{
            return(
                <li key={country.iso}><div><strong>({country.prefix})</strong> - {country.name}</div></li>
            )
        })}
        </CountrySelect>
    );
};
const CountrySelect = styled.ul`
    list-style: none
    li{
        margin-right:0;
        div{
            strong{
                margin-right: 0.5em;
            }
        }
    }
`;
export default CountriesSelect;