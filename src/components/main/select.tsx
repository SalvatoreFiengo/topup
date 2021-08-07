import React, {FC, useState} from 'react';
import styled from 'styled-components';

import CountrySelectComponent from './countrySelect';
import AddPhoneNumber from './phoneNumber';
import OperatorsSelectComponent from './operatorsSelect';

type SelectType ={
    data: any;
}

const SelectComponent:FC<SelectType> = ({data})=>{
    
    const [isCountrySelected, toggleIsCountrySelected] = useState(false);
    const [showOperators, toggleOperators] = useState(false)
    const [selectedPrefix, updateSectedPrefix] = useState("");
    const [countryName, setCountry] = useState("");
    const [iso, setIso] = useState("");

    const handleCountrySelection = (country:any)=>{
        toggleIsCountrySelected(true);
        updateSectedPrefix("+" + country.prefix + " - ");
        setCountry(country.name);
        setIso(country.iso)
    };
    const toggleCountrySelection = ()=>{
        toggleIsCountrySelected(!isCountrySelected);
    }
    const handleToggleOperators = ()=>{
        toggleOperators(!showOperators)
    }
    return(
        <Select>
            <CountrySelectComponent data={data} handleCountrySelection={handleCountrySelection} isCountrySelected={isCountrySelected} countryName={countryName} toggleCountrySelection={toggleCountrySelection}/>  
            <AddPhoneNumber prefix={selectedPrefix} toggleOperators={handleToggleOperators} showOperators={showOperators}/>  
            {showOperators?<OperatorsSelectComponent data={data} iso={iso}/>:null} 
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