import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {validatePhoneNumber} from '../../helper/validation';


type PhoneNumberComponentTypes = {
    prefix: string;
    setState: (name:string, value:any)=>void;
    phoneNumber: string | undefined;
}
const AddPhoneNumberComponent: FC<PhoneNumberComponentTypes> = ({prefix, setState, phoneNumber, children})=>{
    const [phone, setPhone]= useState<string>("");
    const [isError, setIsError] = useState(false);

    const hanldeUpdatePhoneNumber = (event: React.FormEvent<HTMLInputElement>)=>{
        const phone = event.currentTarget.value;
        validatePhoneNumber(phone, setIsError);
       
        setPhone(formatPhoneNumber(phone, prefix));

    };
    const handleOnClick = (event: React.MouseEvent<HTMLElement>)=>{
        event.preventDefault();
        setState("phoneNumber", phone);
        setPhone("");

    };

    const formatPhoneNumber = (phone:string, prefix:string)=>{
        let formatted = "";
        let formattedPrefix = "+"+prefix+" - "
        if(phone!==undefined && phone.length === formattedPrefix.length-1){
            formatted= ""
        } 
        else if(phone!==undefined && phone.startsWith(formattedPrefix)){
            formatted = phone;
    
        }else{
            formatted = formattedPrefix+phone;
        }
        return formatted;
    };

    return(
        <AddPhoneNumber>
            {phoneNumber!=="" && phoneNumber!==null?
            <>
                {children}
            </>
            :
            <>
                <label>
                    <strong>Enter recipient phone number</strong>
                    <input type="text" placeholder={prefix} value={phone} onChange={hanldeUpdatePhoneNumber}/> 
                    {isError? <p className="error">Error: Not a valid number</p>:null}
                </label>
                <Button disabled={isError} onClick={handleOnClick}>Continue</Button>
            </>
            }
        </AddPhoneNumber>
    );
};
const AddPhoneNumber = styled.div`
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
        font-weight: bold;
        font-size: 18px;
        &:focus { 
            box-shadow: rgb(203 242 0) 0px 0px 2px 2px;
            outline: none;
    }
    label{
        p.error{
            text-align: center;
            color: red;
        }
    }

} `;
export const Button = styled.button`
    height: 56px;
    width: 100%;
    color: rgb(0, 74, 89);
    font-size: 18px;
    background-color: rgb(203 242 0);
    border: 0 solid rgb(112, 140, 140);
    border-radius: 64px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover{
        background-color: rgb(0, 74, 89);
        color: rgb(203 242 0);
    }

`;
export default AddPhoneNumberComponent;