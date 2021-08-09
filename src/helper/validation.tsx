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
    }
};

export const validateFullName=(name:string|undefined)=>{
    if(name!==undefined){
        const re=/^[A-Z][a-z]+\s[A-Z][a-z]+$/;
        const test=re.test(name);
        if (test===false){
            return true;
        }else{
            return false;
        }
    }
}
export const validateCard=(card:string|undefined):boolean=>{
    if(card!==undefined){
        const re=/^\d+$/;
        const test=re.test(card);
        if (test===false){
            return true;
        }else{
            return false;
        }
    }else if(card===""){
        return false;
    }
    return false;
    
}