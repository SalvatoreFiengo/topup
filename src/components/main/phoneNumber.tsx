import { FC, useState } from 'react';
import styled from 'styled-components';
import InfoComponent from './infoComponent';

type PhoneNumberComponentTypes = {
    prefix: string;
    togglePhoneNumber: ()=>void;
    showPhoneNumber: boolean;
    setPhoneNumber: (phone:string)=>void;
    phoneNumber: string;
}
const AddPhoneNumberComponent: FC<PhoneNumberComponentTypes> = ({prefix, togglePhoneNumber, showPhoneNumber, setPhoneNumber, phoneNumber})=>{
    
    const [isError, setIsError] = useState(false);

    const hanldeUpdatePhoneNumber = (event: React.FormEvent<HTMLInputElement>)=>{
        const phone = event.currentTarget.value;
        validatePhoneNumber(phone); 
        setPhoneNumber(formatPhoneNumber(phone, prefix));
    };

    const formatPhoneNumber = (phone:string, prefix:string)=>{
        let formatted = "";
        if(phone.length === prefix.length-1){
            formatted= ""
        } 
        else if(phone.startsWith(prefix)){
            formatted=phone;
    
        }else{
            formatted = prefix+phone;
        }
        return formatted;
    };

    const validatePhoneNumber=(phone:string)=>{
        const re = /^\+\d+\s\-\s\d+$/;
        const test=re.test(phone);
        if (test===false){
            setIsError(true);
        }else{
            if(phone.length < 6){
                setIsError(true);
            }
            setIsError(false);
        }
    };

    return(
        <AddPhoneNumber>
            {showPhoneNumber?
            <>
                <label>
                    <strong>Enter recipient phone number</strong>
                    <input type="text" placeholder={prefix} value={phoneNumber} onChange={hanldeUpdatePhoneNumber}/> 
                    {isError? <p className="error">Error: Not a valid number, expected prefix to be "+00 - "</p>:null}
                </label>
                <Button disabled={isError} onClick={togglePhoneNumber}>Continue</Button>
            </>
            :
            <div>
                <InfoComponent label="Phone" name={phoneNumber} toggleFunc={togglePhoneNumber}/>
            </div>
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

} `
const Button = styled.button`
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