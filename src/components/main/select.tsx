import React, {FC, useState} from 'react';
import styled from 'styled-components';

import CountrySelectComponent from './countrySelect';
import AddPhoneNumber from './phoneNumber';

type SelectType ={
    data: any;
}

const SelectComponent:FC<SelectType> = ({data})=>{
    
    const [isCountrySelected, toggleIsCountrySelected] = useState(true);
    const [selectedPrefix, updateSectedPrefix] = useState("");
    const [countryName, setCountry] = useState("");

    const handleCountrySelection = (country:any)=>{
        toggleIsCountrySelected(false);
        updateSectedPrefix("(+" + country.prefix + ") - ");
        setCountry(country.name);
    };
    const toggleCountrySelection = ()=>{
        toggleIsCountrySelected(!isCountrySelected);
    }
    return(
        <Select>
            <CountrySelectComponent data={data} handleCountrySelection={handleCountrySelection} isCountrySelected={isCountrySelected} countryName={countryName} toggleCountrySelection={toggleCountrySelection}/>  
            <AddPhoneNumber prefix={selectedPrefix}/>   
        </Select>
    );
};
const Select = styled.div`
    margin: 0 auto;
    width: 50%;
    background-color: whitesmoke;
    padding: 2em;
    border-radius: 32px 8px 8px;

`
export default SelectComponent;