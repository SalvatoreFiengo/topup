import {FC, useState} from 'react';
import styled from 'styled-components';

import CountrySelectComponent from './countrySelect';
import AddPhoneNumber from './phoneNumber';
import OperatorsSelectComponent from './operatorsSelect';
import ProductComponent from './productsComponent';

type SelectType ={
    data: any;
}

const SelectComponent:FC<SelectType> = ({data})=>{
    
    const [isCountryInfo, toggleIsCountryInfo] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showPhoneNumber, togglePhoneNumber] = useState(true);
    const [showProducts, toggleShowProducts] = useState(false);
    const [isOperatorInfo, toggleOperatorInfo] = useState(false);
    const [isProductInfo, toggleProductInfo] = useState(false);
    const [selectedPrefix, updateSectedPrefix] = useState("");
    const [countryName, setCountry] = useState("");
    const [operator, setOperator] = useState("")
    const [iso, setIso] = useState("");
    const [productId, setProductId] = useState("");

    const handleCountrySelection = (country:any)=>{
        toggleIsCountryInfo(true);
        updateSectedPrefix("+" + country.prefix + " - ");
        setCountry(country.name);
        setIso(country.iso)
    };
    const toggleCountrySelection = ()=>{
        toggleIsCountryInfo(!isCountryInfo);
        updateSectedPrefix("");
        setPhoneNumber("");
        togglePhoneNumber(!showPhoneNumber);
        toggleProductInfo(false);
        toggleShowProducts(false);
        toggleOperatorInfo(false);
    }
    const handleTogglePhoneNumber = ()=>{
        togglePhoneNumber(!showPhoneNumber);
        toggleOperatorInfo(false);
        toggleShowProducts(false);
    };
    const handleToggleOperatorInfo = ()=>{
        toggleOperatorInfo(!isOperatorInfo);
        toggleShowProducts(false);
    };
    const handleSetOperator = (operator:any)=>{
        toggleOperatorInfo(!isOperatorInfo);
        toggleShowProducts(!showProducts);
        setOperator(operator.name);
        setProductId(operator.id)
    };
    const handleSetPhoneNumber = (phone: string)=>{
        setPhoneNumber(phone);
    }
    return(
        <Select>
            <CountrySelectComponent data={data} handleCountrySelection={handleCountrySelection} isCountryInfo={isCountryInfo} countryName={countryName} toggleCountrySelection={toggleCountrySelection}/>  
            {isCountryInfo?
                <AddPhoneNumber 
                    prefix={selectedPrefix} 
                    togglePhoneNumber={handleTogglePhoneNumber} 
                    showPhoneNumber={showPhoneNumber} 
                    setPhoneNumber={handleSetPhoneNumber} 
                    phoneNumber={phoneNumber}/> 
                :null 
            } 
            {showPhoneNumber===false?
                <OperatorsSelectComponent 
                    data={data} 
                    iso={iso} 
                    toggleOperatorInfo={handleToggleOperatorInfo} 
                    isOperatorInfo={isOperatorInfo} 
                    handleSetOperator={handleSetOperator} 
                    operator={operator}
                    />
                :null 
            } 
            {showProducts?<ProductComponent data={data} id={productId} isProductInfo={isProductInfo}/>:null}

        </Select>
    );
};
const Select = styled.div`
    margin: 0 auto;
    width: 70%;
    background-color: whitesmoke;
    padding: 2em;
    border-radius: 32px 8px 8px;

`
export default SelectComponent;