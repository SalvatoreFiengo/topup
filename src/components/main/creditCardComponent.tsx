import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import ModalComponent from '../modal/modal';
import InfoComponent from './infoComponent';
import {validateFullName} from '../../helper/validation';
import {Button} from './phoneNumberComponent';
import { setConstantValue } from 'typescript';

type formDatatypes = {  
    fullName?: string;
    cardNumber?: string;
    month?: string;
    year?: string;
    CCV?: string;
    phoneNumber?: string; 
    amount?: string; 
    currency?: string;  
} 
type CreditCardComponentTypes = {
    phoneNumberProp: string;
    amountProp: string;
    setState:(name:string, value:any)=>void;
}
const CreditCardComponent: FC<CreditCardComponentTypes> =({phoneNumberProp, amountProp, children, setState})=>{
    const [formData, updateFormData] = useState<formDatatypes>({
        fullName: "",
        cardNumber: "",
        month: "",
        year: "",
        CCV: "" ,
        phoneNumber: "",
        amount: "",
        currency: "",
    });
    const [isConfirmationModal, toggleConfirmationModal] = useState(false);
    const [showInfo, setShowInfo] = useState<string|null>("show");

    useEffect(()=>{
        handleResetForm();
    },[]);

    const handleFormOnChange = (event:React.FormEvent<HTMLInputElement>)=>{
        const key = event.currentTarget.name;
        let value = event.currentTarget.value;
        if( key === "cardNumber"&&
            formData.cardNumber !== undefined && 
            value.length >= formData.cardNumber.length && 
            formData.cardNumber.length<=16
            ){
            let originalValue = value.replace(/-/g,"");
            if(value.length>0 && originalValue.length %4 ===0){
                value+="-";
            }
        }
        updateFormData({
            ...formData,
            [key]: value
        });
    };

    const handleFormSubmit = (event:React.SyntheticEvent<HTMLFormElement>)=>{
        event.preventDefault();
        let formattedAmount = "";
        let formattedCurrency = "";
        if(amountProp){
            formattedAmount = amountProp.split(" ")[0];
            formattedCurrency = amountProp.split(" ")[1];
        }
        updateFormData(()=>({
            ...formData,
            phoneNumber: phoneNumberProp,
            amount: formattedAmount,
            currency: formattedCurrency,
        }));
        setShowInfo(null);
        setState("cardNumber",formData.cardNumber)
    };
    const handleResetForm = ()=>{
        updateFormData({
            fullName: undefined,
            cardNumber: undefined,
            month: undefined,
            year: undefined,
            CCV: undefined ,
            phoneNumber: undefined,
            amount: undefined,
            currency: undefined,
        });
    }

    const handleShowModal = ()=>{
        toggleConfirmationModal(!isConfirmationModal);
    };

    const handleBackButton = ()=>{
        setState("cardNumber",null);
        setState("amount",null);
    };

    const confirmationMsg = (phone:string|undefined|null)=>(<div><p>Your Top Up to:</p>
        <p>{phone}</p>
        <p>is successful!</p></div>);

    return(
        <CreditCard>
            {showInfo!==null?
            <>
                <h2>Fill Your Credit Card Data</h2>
                <CreditCardForm onSubmit={handleFormSubmit}>
                    <div>
                        <label>Card Holder Name
                            <input className="input" type="text" placeholder="Name" name="fullName" value={formData.fullName} onChange={handleFormOnChange}/>
                            {validateFullName(formData.fullName)?<p>Name is invalid, please insert "name surname" </p>:null}
                        </label>
                    </div>
                    <div>
                        <label>Card Number
                            <input className="input" type="text" placeholder="Card" maxLength={19} name="cardNumber" value={formData.cardNumber} onChange={handleFormOnChange}/>
                        </label>
                    </div>
                    <div className="end-date">
                        <label> <p>End Date</p>
                            <input className="input left" type="text" placeholder="01" maxLength={2} name="month" value={formData.month} onChange={handleFormOnChange}/>
                            <input className="input right" type="text" placeholder="21" maxLength={2} name="year" value={formData.year} onChange={handleFormOnChange}/>
                        </label>    
                    </div>
                    <div>
                        <label>Card Secret number (CCV)
                            <input className="input" type="text" placeholder="CCV" maxLength={3} name="CCV" value={formData.CCV} onChange={handleFormOnChange}/>
                        </label>
                    </div>
                    <div className="form-cockpit">
                        <Checkout type="submit">Confirm</Checkout><Back onClick={handleBackButton}>Back</Back>
                    </div>
                </CreditCardForm>
            </>
            :
            <>
            {children}
            <Button disabled={false} onClick={handleShowModal}>Checkout</Button>
            </>
            }
            <ModalComponent isOpen={isConfirmationModal} toggleModal={handleShowModal} modalTitle={"Successful"} modalMsg={confirmationMsg(phoneNumberProp)} color={"rgb(0, 74, 89);"}/>
        </CreditCard>

    );
};
const CreditCard = styled.div`
    h2{
        text-align: center;
    }    
`;
const CreditCardForm = styled.form`
    .input{
        margin: 0.5em 0 2em 0;
        border: 1px solid rgb(112, 140, 140);
        border-radius: 8px;
        height: 40px;
        width: 100%;
        display: block;
        color: rgb(0, 74, 89);
        padding: 0px 16px;
        box-sizing: border-box;
        &:focus { 
            box-shadow: rgb(203 242 0) 0px 0px 2px 2px;
            outline: none;
        }
    }
    .end-date{
        p{
            display: inline-block;
            margin-right: 1rem;
        }
        .input{
            padding: 2px;
            height: 25px;
            width: 25px;
            display: inline-block;
            &.left{
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
            }
            &.right{
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
            } 
        }

    }
    &:before, &:after{
        content: "";
        display: block;
        clear:both;
    }
`;
const Checkout = styled(Button)`
    width: 30%;
    float: left;

`
const Back = styled(Button)`
    width: 30%;
    color: whitesmoke;
    background-color: rgb(217,0,199);
    float: right;

`
export default CreditCardComponent;