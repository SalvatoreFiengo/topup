import { CountryType, OperatorType } from "./types";

export interface IData {
    countries:CountryType[],
    operators:OperatorType[],
    products:{
        id: string,
        products: string[]
    }[]   
};

export interface IAppMainState {
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

export interface ICountriesSelect {
    data:IData;
    setState:(name:string, value:any)=>void;
    country: CountryType | undefined | null;
};

export interface IOperatorsSelect {
    data: IData;
    iso: string|undefined|null;
    setState: (name:string, value:any)=>void;
    operator: OperatorType|null;
};

export interface IPhoneNumberComponent {
    prefix: string;
    setState: (name:string, value:any)=>void;
    phoneNumber: string | undefined;
};

export interface IFormData {  
    fullName: string;
    cardNumber: string;
    month: string;
    year: string;
    CCV: string;
    phoneNumber: string; 
    amount: string; 
    currency: string;  
};

export interface ICreditCardComponent {
    phoneNumberProp: string;
    amountProp: string;
    setState:(name:string, value:any)=>void;
}

export interface IValidation {
    value: string;
    state: IccError
};