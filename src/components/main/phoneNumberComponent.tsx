import React, { FC, useState } from 'react';
import { Input, Button, Error } from '../../styles/generalStyles';
import { validate } from '../../helper/validation';
import { IPhoneNumberComponent } from '../interfaces/interfaces';

const AddPhoneNumberComponent: FC<IPhoneNumberComponent> = ({prefix, setState, phoneNumber, children})=>{
    const [phone, setPhone]= useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const hanldeUpdatePhoneNumber = (event: React.FormEvent<HTMLInputElement>):void=>{
        const phone = event.currentTarget.value;
        setIsError(validate("phoneNumber", phone));
        setPhone(formatPhoneNumber(phone, prefix));

    };
    const handleOnClick = (event: React.MouseEvent<HTMLElement>):void=>{
        event.preventDefault();
        setState("phoneNumber", phone);
        setPhone("");

    };

    const formatPhoneNumber = (phone:string, prefix:string):string=>{
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
        <div>
            {phoneNumber!=="" && phoneNumber!==null?
            <>
                {children}
            </>
            :
            <>
                <label>
                    <strong>Enter recipient phone number</strong>
                    <Input type="text" placeholder={prefix} value={phone} onChange={hanldeUpdatePhoneNumber}/> 
                    {isError? <Error className="error" multi={false}>Error: Not a valid number</Error>:null}
                </label>
                <Button disabled={isError} onClick={handleOnClick}>Continue</Button>
            </>
            }
        </div>
    );
};

export default AddPhoneNumberComponent;