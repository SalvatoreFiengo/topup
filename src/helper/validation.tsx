import { IccError, IValidation } from "../components/interfaces/interfaces";
import { validationIsErrorReturnType } from "../components/interfaces/types";

export const validate=(key:string, value:string|undefined):boolean=>{
    if(value!==undefined && value!==""){
        const getRe = ():RegExp=>{
            let re;
            switch(key){
                case "phoneNumber":
                    re = /^\+\d+\s-\s\d{7,10}$/;
                    break;
                case "fullName":
                    re=/^[A-Z][a-z]+\s[A-Z][a-z]+$/;
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

const checkCardFormattedIsError = (key: string,value: string, isError:boolean, valueToCheckAgainst?:string):validationIsErrorReturnType=>{
    let originalValue = value.replace(/-/g,"");
    let result:validationIsErrorReturnType;

    isError = validate(key, originalValue);
    const checkOriginalValue = value.length > 0 && originalValue.length %4 ===0 && originalValue.length<16;
    const checkValueFromState = valueToCheckAgainst !== undefined && valueToCheckAgainst.length > 0 && value.length < valueToCheckAgainst.length;
    if(checkOriginalValue && !checkValueFromState){
        value+="-";
    };
    result = {value, isError}
    return result;
};

const checkMonthIsError = (value: string, isError:boolean):validationIsErrorReturnType=>{
    const checkError= validate("",value);
    let result:validationIsErrorReturnType;

    if(checkError){
        isError= checkError;
    }else if(!value.startsWith("0")){
        const intValue = parseInt(value);
        if(intValue < 1 || intValue>12){
            isError = true;
        }else{
            isError =false;
        }
    }
    result = {value, isError}
    return result;
};

export const validateFormFields= (key: string, value: string, state:IccError, valueToCheckAgainst?:string):IValidation=>{
    if(key === "cardNumber" && value === ""){
        state.isCardError = true;
    }else if( 
            key === "cardNumber"&&
            valueToCheckAgainst !== undefined 
        ){
        const formattedAndEvaluated = checkCardFormattedIsError(key, value, state.isCardError, valueToCheckAgainst);   
        [value, state.isCardError]=[formattedAndEvaluated.value,formattedAndEvaluated.isError];
    }else if(key === "month"){
        const validatedMonth= checkMonthIsError(value, state.isMonthError);
        [value, state.isMonthError] = [validatedMonth.value, validatedMonth.isError];
    }else if(key === "year"){
        state.isYearError = validate("",value);
    }else if(key === "fullName"){
        state.isNameError = validate(key,value);
    }else if(key === "CCV"){
        state.isCCVError = validate(key,value);
    }
    return {value,state};
};