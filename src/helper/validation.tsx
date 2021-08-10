import { IccError, IValidation } from "../components/interfaces/interfaces";
import { validationIsErrorReturnType } from "../components/interfaces/types";

/*
    The code below will evaluate form values 
    against set regex
*/
export const validate=(key:string, value:string|undefined):boolean=>{
    if(value!==undefined && value!==""){
        const getRe = ():RegExp=>{
            let re;
            switch(key){
                case "phoneNumber":
                    re = /^\+\d+\s-\s\d{7,10}$/;
                    break;
                case "fullName":
                    re=/^[a-z]+\s[a-z]+$/;
                    break;
                case "cardNumber":
                    re=/^\d{15,16}$/;
                    break;
                case "CCV":
                    re=/^\d{3}$/;
                    break;
                default:
                    re=/^\d{2}$/;
                    break;
            }
            return re;
        }
        const re = getRe();
        const test=re.test(value);
        if (test===false){
            return true;
        }else{
            return false;
        }
    }else{
        return true;
    };   
};

/*
    The code below will format form value for the month 
    and perform the evaluation using 'validate' function
*/
const checkMonthIsError = (value: string, isError:boolean):validationIsErrorReturnType=>{
    const checkError= validate("",value);
    let result:validationIsErrorReturnType;

    if(value.startsWith("0")){
        const intValue = parseInt(value.slice(0, value.length));
        
        if(intValue < 1 || intValue>12){
            isError = true;
        }else{
            isError = false;
        }
    }else{
        isError = checkError;
    }
    result = {value, isError};
    return result;
};
/*
    'validateFormFields' will use the functions above 
    to validate all form fields
*/
export const validateFormFields= (key: string, value: string, state:IccError):IValidation=>{
    if(key === "cardNumber" && value === ""){
        state.isCardError = true;
    }else if( 
            key === "cardNumber"
        ){ 
        state.isCardError= validate(key, value);
    }else if(key === "month"){
        const validatedMonth= checkMonthIsError(value, state.isMonthError);
        [value, state.isMonthError] = [validatedMonth.value, validatedMonth.isError];
    }else if(key === "year"){
        state.isYearError = validate("",value);
    }else if(key === "fullName"){
        state.isNameError = validate(key,value.toLowerCase());
    }else if(key === "CCV"){
        state.isCCVError = validate(key,value);
    }
    return {value,state};
};