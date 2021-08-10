import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import ModalComponent from '../modal/modal';
import { validateFormFields } from '../../helper/validation';
import { Input, Button, Error } from '../../styles/generalStyles';
import { IccError, ICreditCardComponent, IFormData } from '../interfaces/interfaces';

const CreditCardComponent: FC<ICreditCardComponent> =({phoneNumberProp, amountProp, children, setState})=>{
    const [formData, updateFormData] = useState<IFormData>({
        fullName: "",
        cardNumber: "",
        month: "",
        year: "",
        CCV: "" ,
        phoneNumber: "",
        amount: "",
        currency: "",
    });
    const [isConfirmationModal, toggleConfirmationModal] = useState<boolean>(false);
    const [showInfo, setShowInfo] = useState<string|null>("show");
    const [error, setIsError] = useState<IccError>({
        isNameError: true,
        isCardError: true,
        isMonthError: true,
        isYearError: true,
        isCCVError: true,
        isNotCheckout: true,
    });

    useEffect(()=>{
        handleResetForm();
    },[]);

    const handleFormOnChange = (event:React.FormEvent<HTMLInputElement>)=>{
        const key = event.currentTarget.name;
        let value = event.currentTarget.value;

        const validation = validateFormFields(key, value, error, formData.cardNumber);

        setIsError(validation.state);

        if(error.isNameError || error.isCardError){
            setIsError({...error, isNotCheckout: true});
        }else{
            setIsError({...error, isNotCheckout: false});
        };

        updateFormData({
            ...formData,
            [key]: validation.value
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
    const handleResetForm = ():void=>{
        updateFormData({
            fullName: "",
            cardNumber: "",
            month: "",
            year: "",
            CCV: "" ,
            phoneNumber: "",
            amount: "",
            currency: "",
        });
        setIsError({...error, isNotCheckout: true})
    }

    const handleShowModal = ():void=>{
        toggleConfirmationModal(!isConfirmationModal);
    };

    const handleBackButton = ():void=>{
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
                    <div className="form-section">
                        <label><div className="labelTitle">Card Holder Name</div>
                            <Input className="input" type="text" placeholder="Name" name="fullName" value={formData.fullName} onChange={handleFormOnChange}/>
                            {error.isNameError?<Error multi={false}>Name is {formData.fullName!==""?'invalid':'missing'}, please insert "Name Surname" </Error>:null}
                        </label>
                    </div>
                    <div className="form-section">
                        <label>Card Number
                            <Input className="input" type="text" placeholder="Card" maxLength={19} name="cardNumber" value={formData.cardNumber} onChange={handleFormOnChange}/>
                            {error.isCardError?<Error multi={false}>Card is {formData.cardNumber!==""?'invalid':'missing'}, please insert only numbers </Error>:null}
                        </label>
                    </div>
                    <div className="end-date">
                        <label> <div>End Date</div>
                            <Input className="left" type="text" placeholder="01" maxLength={2} name="month" value={formData.month} onChange={handleFormOnChange}/>
                            <Input className="right" type="text" placeholder="21" maxLength={2} name="year" value={formData.year} onChange={handleFormOnChange}/>
                                <div>{error.isMonthError?<Error multi={true}>Month is {formData.month!==""?'invalid':'missing'}</Error>:null}
                                {error.isYearError?<Error multi={true}>Year is {formData.year!==""?'invalid':'missing'}</Error>:null}</div>
                        </label>    
                    </div>
                    <div className="form-section">
                        <label>Card Secret number (CCV)
                            <Input className="input" type="text" placeholder="CCV" maxLength={3} name="CCV" value={formData.CCV} onChange={handleFormOnChange}/>
                            {error.isCCVError?<Error multi={false}>Secret Code is {formData.CCV!==""?'invalid':'missing'}, please insert only 3 numbers </Error>:null}
                        </label>
                    </div>
                    <div className="form-cockpit">
                        <Checkout disabled={error.isNotCheckout} type="submit">Confirm</Checkout><Back onClick={handleBackButton}>Back</Back>
                    </div>
                </CreditCardForm>
            </>
            :
            <>
            {children}
            <Button onClick={handleShowModal}>Checkout</Button>
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
    .form-section{
        margin-bottom: 1.5rem;
    }
    .end-date{
        margin-bottom: 1.5rem;
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
    width: 40%;
    float: left;
    @media(min-width: 768px){
        width: 30%; 
    }
`
const Back = styled(Button)`
    width: 40%;
    color: whitesmoke;
    background-color: rgb(217,0,199);
    float: right;
    @media(min-width: 768px){
        width: 30%; 
    }

`
export default CreditCardComponent;