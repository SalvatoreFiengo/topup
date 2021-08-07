import { FC, useState } from 'react';
import styled from 'styled-components';
import InfoComponent from './infoComponent';

type PhoneNumberComponentTypes = {
    prefix: string;
    toggleOperators: ()=>void;
    showOperators: boolean;
}
const AddPhoneNumberComponent: FC<PhoneNumberComponentTypes> = ({prefix, toggleOperators, showOperators})=>{
    const [phoneNumber, setPhoneNumber] = useState("");
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
        const re = /^\W[0-9]{2}\s\W\s\d+$/;
        const test=re.test(phone);
        if (test===false){
            setIsError(true);
        }else{
            setIsError(false);
        }
    };
    const handleShowOperators = ()=>{
        toggleOperators();
    }
    return(
        <AddPhoneNumber>
            {showOperators===false?
            <>
                <label>
                    <strong>Enter recipient phone number</strong>
                    <input type="text" placeholder={prefix} value={phoneNumber} onChange={hanldeUpdatePhoneNumber}/> 
                    {isError? <p className="error">Error: Not a valid number</p>:null}
                </label>
                <Button disabled={isError} onClick={handleShowOperators}>Continue</Button>
            </>
            :
            <InfoComponent label="Phone" name={phoneNumber} toggleFunc={toggleOperators}/>
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