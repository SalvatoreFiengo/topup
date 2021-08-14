import {FC, useState} from 'react';
import styled from 'styled-components';
import { IData, IAppMainState} from '../interfaces/interfaces';
import CountrySelectComponent from './countrySelectComponent';
import AddPhoneNumber from './phoneNumberComponent';
import OperatorsSelectComponent from './operatorsSelectComponent';
import ProductComponent from './productsComponent';
import CreditCardComponent from './creditCardComponent';
import InfoComponent from './infoComponent';

type SelectWrapperComponentTypes ={
    data: IData;
}

const SelectWrapperComponent:FC<SelectWrapperComponentTypes>=({data})=>{
    const [state, setState] = useState<IAppMainState>({
        phoneNumber: "",
        country: null,
        operator: null,
        amount: null,
        cardNumber: null
    })
    const handleSetState = (name:string, value:any)=>{
        setState(({
            ...state,
            [name]:value
        }))
    }
    const formatInfoCreditCard = (creditCard:string|null):string=>{
        if(creditCard!==null){
            const hiddenCreditCard = "* ".repeat(3) + " " + creditCard.slice(creditCard.length-4, creditCard.length);
            return hiddenCreditCard;
        }
        else{
            return "";
        }
    }
    return(
        <SelectWrapper>
            <CountrySelectComponent 
                data={data} 
                setState={handleSetState} 
                country={state.country}>
                <InfoComponent 
                    label="Country" 
                    msg={state.country!==null?state.country.name:""} 
                    setState={()=>setState({
                        phoneNumber: "",
                        country: null,
                        operator: null,
                        amount: null,
                        cardNumber: null
                    })}
                />
            </CountrySelectComponent>
            {state.country!==null?
                <AddPhoneNumber 
                    prefix={state.country.prefix} 
                    setState={handleSetState} 
                    phoneNumber={state.phoneNumber}>
                    <InfoComponent 
                        label="Phone" 
                        msg={state.phoneNumber!==null?state.phoneNumber:""} 
                        setState={()=>setState({
                            ...state, 
                            phoneNumber: "", 
                            operator: null, 
                            amount: null,
                            cardNumber: null
                        })}
                    />
                </AddPhoneNumber>
                :null 
            } 
            {state.phoneNumber!=="" && state.country!==null?
                <OperatorsSelectComponent 
                    data={data} 
                    iso={state.country.iso} 
                    setState={handleSetState} 
                    operator={state.operator}
                    >
                    <InfoComponent 
                        label="Operator" 
                        msg={state.operator!==null?state.operator.name:""} 
                        setState={()=>setState({
                            ...state,
                            operator: null,
                            amount: null
                        })}
                    />
                    </OperatorsSelectComponent>
                :null 
            } 
            {state.operator!==null && state.country!==null?
                <ProductComponent 
                    data={data} 
                    id={state.operator.id} 
                    setState={handleSetState}
                    amount={state.amount}
                >
                    <InfoComponent 
                        label="Amount" 
                        msg={state.amount!==null? state.amount : ""} 
                        setState={()=>setState({
                            ...state,
                            amount: null,
                            cardNumber: null
                        })}
                    />
                </ProductComponent>
                :null
            }
            {state.amount!==null && state.amount!==undefined?
                <CreditCardComponent phoneNumberProp={state.phoneNumber} amountProp={state.amount} cardNumberProp={state.cardNumber} setState={handleSetState}>
                    <InfoComponent label={"Card"} msg={formatInfoCreditCard(state.cardNumber)} setState={()=>setState({
                            ...state,
                            cardNumber:null
                        })}/>
                </CreditCardComponent>:null
            }
        </SelectWrapper>
    );
};
const SelectWrapper = styled.div`
    margin: 0 auto;
    width: 100%;
    background-color: whitesmoke;
    padding: 2em;
    border-radius: 32px 8px 8px;
    @media (min-width: 768px){
        width: 70%;
    }
`
export default SelectWrapperComponent;