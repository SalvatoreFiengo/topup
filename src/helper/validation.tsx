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

export const validate=(key:string, value:string|undefined):boolean=>{
    if(value!==undefined && value!==""){
        const getRe = ()=>{
            let re;
            switch(key){
                case "phoneNumber":
                    re = /^\+\d+\s\-\s\d{7,10}$/;
                    break;
                case "fullName":
                    re=/^[A-Z][a-z]+\s[A-Z][a-z]+$/;
                    break;
                case "cardNumber":
                    re=/^\d{16}$/;
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
        const re=getRe();
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

export const validateFormFields= (key: string, value: string, state:IccError, valueToCheckAgainst?:string):validation=>{
    if(key === "cardNumber" && value === ""){
        state.isCardError = true;
    }else if( 
            key === "cardNumber"&&
            valueToCheckAgainst !== undefined && 
            value.length >= valueToCheckAgainst.length
        ){
        let originalValue = value.replace(/-/g,"");

        state.isCardError = validate(key,originalValue);

        if(value.length>0 && originalValue.length %4 ===0 && originalValue.length<16){
            value+="-";
        };
    }else if(key === "month"){
        const checkError= validate("",value);
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
        state.isYearError = validate("",value);
    }else if(key === "fullName"){
        state.isNameError = validate(key,value);
    }else if(key === "CCV"){
        state.isCCVError = validate(key,value);
    }
    return {value,state};
};