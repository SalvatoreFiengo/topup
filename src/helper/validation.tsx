import { IccError, validation } from "../components/interfaces/interfaces";
export const validatePhoneNumber=(phone:string, setState:(bool:boolean)=>void)=>{
    const re = /^\+\d+\s\-\s\d{7,10}$/;
    const test=re.test(phone);
    if (test===false){
        setState(true);
    }else{
        if(phone.length < 6){
            setState(true);
        }
        setState(false);
    };
};

export const validateFullName=(name:string|undefined):boolean=>{
    if(name!==undefined && name!==""){
        const re=/^[A-Z][a-z]+\s[A-Z][a-z]+$/;
        const test=re.test(name);
        if (test===false){
            return true;
        }else{
            return false;
        }
    }else{
        return true;
    };
};
export const validateDigits=(digits:string|undefined):boolean=>{
    if(digits!==undefined && digits!==""){
        const re=/^\d+$/;
        const test=re.test(digits);
        if (test===false){
            return true;
        }else{
            return false;
        }
    }else{
        return true;
    };   
};

export const validateFormFields= (key: string, value: string, state:IccError, valueToCheckAgainst?:string):validation=>{
    if(key === "cardNumber" && value === ""){
        state.isCardError = true;
    }else if( 
            key === "cardNumber"&&
            valueToCheckAgainst !== undefined && 
            value.length >= valueToCheckAgainst.length && 
            valueToCheckAgainst.length<=16
        ){
        let originalValue = value.replace(/-/g,"");
        state.isCardError = validateDigits(originalValue);
        if(!state.isCardError && value.length>0 && originalValue.length %4 ===0){
            value+="-";
        };
    }else if(key === "month"){
        const checkError= validateDigits(value);
        if(checkError){
            state.isMonthError= checkError;
        }else if(!value.startsWith("0")){
            const intValue = parseInt(value);
            if(intValue < 1 || intValue>12){
                state.isMonthError = true;
            }else{
                state.isMonthError =false;
            }
        }
    }else if(key === "year"){
        state.isYearError = validateDigits(value);
    }else if(key === "fullName"){
        state.isNameError = validateFullName(value);
    }else if(key === "CCV"){
        state.isCCVError = validateDigits(value);
    }
    return {value,state};
};