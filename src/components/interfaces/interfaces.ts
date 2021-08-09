import { CountryType, OperatorType } from "./types";

export interface Idata {
    countries:CountryType[],
    operators:OperatorType[],
    products:{
        id: string,
        products: string[]
    }[]   
};

export interface IappMainState {
    phoneNumber: string,
    country: CountryType | null,
    operator: OperatorType | null,
    amount: string | undefined | null,
    cardNumber: string|null
};

export interface IccError {
    isNameError: boolean;
    isCardError: boolean;
    isMonthError: boolean;
    isYearError: boolean;
    isCCVError: boolean;
    isNotCheckout: boolean;
};

export interface IcountriesSelect {
    data:any;
    setState:(name:string, value:any)=>void;
    country: CountryType | undefined | null;
};

export interface IoperatorsSelect {
    data: any;
    iso: string|undefined|null;
    setState: (name:string, value:any)=>void;
    operator: OperatorType|null;
};

export interface IphoneNumberComponent {
    prefix: string;
    setState: (name:string, value:any)=>void;
    phoneNumber: string | undefined;
};

export interface IformData {  
    fullName: string;
    cardNumber: string;
    month: string;
    year: string;
    CCV: string;
    phoneNumber: string; 
    amount: string; 
    currency: string;  
};

export interface IcreditCardComponent {
    phoneNumberProp: string;
    amountProp: string;
    setState:(name:string, value:any)=>void;
}

export type validation = {
    value: string;
    state: IccError
};